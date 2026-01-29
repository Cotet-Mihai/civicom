import React, {useEffect, useRef, useState} from "react";
import L from "leaflet";
import {SearchIcon} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Suggestion} from "@/types/map";


export function MapSearch({
                              onSelect,
                              mapRef,
                          }: {
    onSelect: (coords: [number, number]) => void;
    mapRef: React.RefObject<L.Map | null>;
}) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (value: string) => {
        setQuery(value);
        if (value.trim() === "") {
            setSuggestions([]);
            setShowSuggestions(false);
            setHighlightedIndex(0);
            return;
        }
        setShowSuggestions(true);
    };

    useEffect(() => {
        if (!query.trim() || !showSuggestions) return;

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                        query
                    )}&format=json&limit=5&countrycodes=RO`
                );
                const data: Suggestion[] = await res.json();
                setSuggestions(data);
                setHighlightedIndex(0);
            } catch (error) {
                console.error(error);
            }
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, showSuggestions]);

    const handleSelect = (s: Suggestion) => {
        const coords: [number, number] = [parseFloat(s.lat), parseFloat(s.lon)];
        onSelect(coords);
        setQuery(s.display_name);
        setSuggestions([]);
        setShowSuggestions(false);
        setHighlightedIndex(0);

        if (mapRef.current) {
            mapRef.current.setView(coords, 15);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) =>
                prev === 0 ? suggestions.length - 1 : prev - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            handleSelect(suggestions[highlightedIndex]);
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative mb-4 z-[1000]">
            <InputGroup>
                <InputGroupInput
                    placeholder="Caută locația..."
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <InputGroupAddon>
                    <button
                        onClick={() => {
                            if (suggestions.length > 0) handleSelect(suggestions[0]);
                        }}
                    >
                        <SearchIcon className="w-5 h-5" />
                    </button>
                </InputGroupAddon>
            </InputGroup>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-[1100] w-full bg-white border rounded mt-1 max-h-60 overflow-auto shadow-lg">
                    {suggestions.map((s, i) => (
                        <li
                            key={i}
                            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                                highlightedIndex === i ? "bg-gray-200" : ""
                            }`}
                            onMouseEnter={() => setHighlightedIndex(i)}
                            onClick={() => handleSelect(s)}
                        >
                            {s.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}