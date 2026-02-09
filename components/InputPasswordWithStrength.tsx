import { cn } from '@/lib/utils';
import InputPassword from "@/components/InputPassword";

export default function InputPasswordStrength({
                                                  password,
                                                  setPasswordAction,
                                                  strength
                                              }: {
    password: string,
    setPasswordAction: (password: string) => void,
    strength: {
        strength: {
            met: boolean;
            text: string;
        }[];
        strengthScore: number;
    }
}) {

    const getColor = (score: number) => {
        if (score === 0) return 'bg-border'
        if (score <= 1) return 'bg-destructive'
        if (score <= 2) return 'bg-orange-500'
        if (score <= 3) return 'bg-amber-500'
        if (score === 4) return 'bg-yellow-400'
        return 'bg-green-500'
    };

    return (
        <div className='w-full max-w-xs space-y-2'>
            <InputPassword
                value={password}
                onChangeAction={setPasswordAction}
            />

            {/* Indicator de progres */}
            <div className='mb-2 flex h-1 w-full gap-1'>
                {Array.from({ length: 5 }).map((_, index) => (
                    <span
                        key={index}
                        className={cn(
                            'h-full flex-1 rounded-full transition-all duration-500 ease-out',
                            index < strength.strengthScore ? getColor(strength.strengthScore) : 'bg-border'
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
