import React from 'react';
import {
    Calendar, Clock, MapPin, Users, Phone, Mail,
    Ban, Navigation, ShieldCheck, Info, Share2,
    Printer, Heart, CalendarPlus, Camera, MoreHorizontal,
    Eye
} from 'lucide-react';

// Simulăm mini-componentele Shadcn
const Card = ({ children, className = "" }) => (
    <div className={`bg-card text-card-foreground rounded-2xl border border-border shadow-xs overflow-hidden ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, className = "" }) => (
    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest backdrop-blur-md bg-black/40 text-white border border-white/20 shadow-sm ${className}`}>
        {children}
    </span>
);

const ActionButton = ({ icon: Icon, label }) => (
    <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all text-xs font-medium border border-transparent hover:border-border">
        <Icon size={14} />
        {label}
    </button>
);

const ProtestPage = () => {
    return (
        <div className="min-h-screen bg-[#fafafa] text-foreground p-4 md:p-12 font-sans selection:bg-primary/10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* === COLOANA STÂNGA (8/12) === */}
                <div className="lg:col-span-8 space-y-8">

                    {/* BANNER PRINCIPAL */}
                    <div className="relative group rounded-3xl overflow-hidden border border-border shadow-xl">
                        {/* Badge finuț peste banner */}
                        <div className="absolute top-4 left-4 z-10">
                            <Badge>Protest: Marș</Badge>
                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400"
                            className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            alt="Banner"
                        />
                        {/* Gradient subtil intern pentru contrast */}
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />
                    </div>

                    {/* HEADER TEXT SECTION */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {/* Rândul cu Dată, Oră și Vizualizări */}
                            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground font-medium w-full border-b border-border pb-4">
                                <div className="flex items-center gap-5">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary"/> 21 Aug 2026</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary"/> 14:00 - 18:30</span>
                                </div>
                                <div className="flex items-center gap-1.5 opacity-80 bg-muted px-2.5 py-1 rounded-md text-xs font-bold border border-border/50">
                                    <Eye size={14}/> <span>2,405 vizualizări</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight uppercase text-foreground text-primary italic">
                                Marșul pentru Păduri
                            </h1>
                        </div>

                        {/* DESCRIERE & BUTOANE */}
                        <div className="space-y-6">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Ne adunăm pentru a opri defrișările masive planificate în zona de nord.
                                Vocea noastră colectivă este singurul scut rămas pentru plămânul verde al orașului.
                                Vino să cerem împreună transparență și protecție reală. Suntem responsabili pentru generațiile viitoare.
                            </p>

                            {/* Butoane de acțiune subtile */}
                            <div className="flex flex-wrap items-center justify-end gap-2 pt-4">
                                <ActionButton icon={Share2} label="Share" />
                                <ActionButton icon={CalendarPlus} label="Adaugă în Calendar" />
                                <ActionButton icon={Printer} label="Print materiale" />
                            </div>
                        </div>
                    </div>

                    {/* GALERIE IMAGINI */}
                    <section className="space-y-4 pt-4">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Camera size={14}/> Documentare Foto
                        </h3>
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-[4/3] rounded-xl bg-muted overflow-hidden border border-border shadow-sm cursor-pointer group">
                                    <img
                                        src={`https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=300&auto=format&fit=crop`}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                        alt="Gallery"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* REGULI & ECHIPAMENT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck size={16} className="text-primary"/> Reguli Siguranță
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                                <li>• Protest pașnic, fără violență verbală.</li>
                                <li>• Urmați instrucțiunile echipei de ordine.</li>
                                <li>• Fără materiale pirotehnice.</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                <Info size={16} className="text-primary"/> Echipament Sugerat
                            </h4>
                            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                                <li>• Apă și gustări energizante.</li>
                                <li>• Pancarte din materiale reciclate.</li>
                                <li>• Veste reflectorizante pentru seară.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* === COLOANA DREAPTĂ (4/12) === */}
                <aside className="lg:col-span-4 space-y-6">

                    {/* STATUS ȘI CONFIRMARE */}
                    <Card className="p-6 space-y-6 bg-white shadow-lg shadow-black/5 border-border">
                        {/* Organizator Integrat Sus */}
                        <div className="flex items-center gap-3 pb-4 border-b border-border/60">
                            <div className="size-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-xs text-primary shrink-0">
                                AI
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-0.5">Organizat de</p>
                                <p className="text-sm font-bold leading-none">Ionescu Andrei</p>
                            </div>
                        </div>

                        {/* Status Participanți */}
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Participanți estimați</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-black italic tracking-tighter text-foreground">0 / 5,000</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                                    <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-black uppercase">Activ</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-[0.1em] text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
                            Confirmă Prezența
                        </button>
                    </Card>

                    {/* TRASEU */}
                    <Card className="p-1.5 bg-white">
                        <div className="aspect-square bg-muted rounded-xl overflow-hidden relative border border-border">
                            <img src="https://api.mapbox.com/styles/v1/mapbox/light-v10/static/26.10,44.43,12/400x400?access_token=xxx" className="w-full h-full object-cover grayscale opacity-50 hover:opacity-70 transition-opacity" alt="Map"/>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-border shadow-lg flex items-center gap-2">
                                    <MapPin size={16} className="text-primary" />
                                    <span className="text-xs font-black uppercase tracking-tight">Piața Victoriei</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* PERSOANE DE CONTACT (Reparat) */}
                    <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Persoane de contact</p>

                        <div className="space-y-4">
                            {/* Un card de contact */}
                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-white border border-border flex items-center justify-center font-black text-xs text-primary shadow-sm">
                                        AI
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-tighter">Ionescu Andrei</p>
                                        <a href="mailto:andrei@protest.ro" className="text-[10px] text-muted-foreground hover:text-primary transition-colors">andrei@protest.ro</a>
                                    </div>
                                </div>
                                {/* Acțiuni contact aliniate în dreapta */}
                                <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <a href="tel:#" className="p-2 bg-white border border-border rounded-lg text-primary hover:bg-muted transition-colors shadow-sm">
                                        <Phone size={14}/>
                                    </a>
                                    <a href="mailto:andrei@protest.ro" className="p-2 bg-white border border-border rounded-lg text-primary hover:bg-muted transition-colors shadow-sm">
                                        <Mail size={14}/>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </aside>
            </div>
        </div>
    );
};

export default ProtestPage;