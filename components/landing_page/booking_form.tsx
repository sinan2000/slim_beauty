'use client'

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, CheckCircle, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as z from "zod"
import { sendSms } from "@/app/actions";
import Cookies from "js-cookie"

const formSchema = z.object({
    name: z.string({
        required_error: "Vă rugăm să introduceți numele dvs.",
    }).min(2, {
        message: "Numele trebuie să conțină cel puțin 2 caractere.",
    }),
    phone: z.string({
        required_error: "Vă rugăm să introduceți numărul de telefon.",
    }).regex(/^\+?\d{8,15}$/, {
        message: "Numărul de telefon trebuie să fie valid, având între 8 și 15 cifre și poate începe cu '+' pentru numere internaționale.",
    }),
    service: z.string({
        required_error: "Vă rugăm să selectați un serviciu.",
    }),
    date: z.date({
        required_error: "Vă rugăm să selectați o dată.",
    }),
    time: z.string({
        required_error: "Vă rugăm să selectați o oră.",
    }),
    message: z.string().optional(),
})

const schedule: { [key: number]: string[] } = {
    0: [], // Sunday - closed
    1: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"], // Monday
    2: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"], // Tuesday
    3: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"], // Wednesday
    4: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"], // Thursday
    5: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"], // Friday
    6: [], // Saturday - closed
};


export default function BookAppointment() {
    const defaultValues = {
        name: '',
        phone: '',
        service: '',
        date: undefined,
        time: '',
        message: ''
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    const [selectedService, setSelectedService] = React.useState<string>('');
    const [selectedTime, setSelectedTime] = React.useState<string>('');

    const [availableTimes, setAvailableTimes] = React.useState<string[]>([])
    const [submitSuccess, setSubmitSuccess] = React.useState<boolean | null>(null)
    const [submitMessage, setSubmitMessage] = React.useState<string>('')

    const handleDateChange = (selectedDate: Date | undefined) => {
        if (!selectedDate) return;

        const dayOfWeek = selectedDate.getDay()
        const times = schedule[dayOfWeek];
        setAvailableTimes(times)
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = {
            name: values.name,
            phone: values.phone,
            service: selectedService,
            date: values.date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' }),
            time: values.time,
            message: values.message || '',
        }
        try {
            await sendSms(payload);

            const consent = Cookies.get('cookie_consent');
            if (consent === 'accepted' && typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'conversion', {
                    send_to: 'AW-16731906773/QaB6CKeQrN8ZENXFsqo-',
                })
            }

            setSubmitSuccess(true);
            setSubmitMessage('Programarea a fost trimisă cu succes! Vă vom contacta pentru confirmare.');
            form.reset(defaultValues);
            setSelectedService('');
            setSelectedTime('');
            setAvailableTimes([]);
        } catch (error) {
            setSubmitSuccess(false);
            console.error(error);
            setSubmitMessage('A apărut o eroare la trimiterea programării. Vă rugăm să încercați din nou mai târziu.');
        }
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center mb-12">Programează o Întâlnire la Slim & Beauty by MC</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nume</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Introduceți numele dvs." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Număr de Telefon</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Introduceți numărul dvs. de telefon" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Serviciu</FormLabel>
                                    <Select
                                        onValueChange={(value) => { field.onChange(value); setSelectedService(value) }}
                                        value={selectedService} name="service"
                                    >
                                        <FormControl>
                                            <SelectTrigger aria-label="Selectați un serviciu">
                                                <SelectValue placeholder="Selectați un serviciu" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel className="text-[#6B4E32] font-semibold">Proceduri Corporale</SelectLabel>
                                                <SelectItem value="vshape">VShape Anticelulitic</SelectItem>
                                                <SelectItem value="criolipoliza">Criolipoliză</SelectItem>
                                                <SelectItem value="emslim">EMSlim Neo RF</SelectItem>
                                                <SelectItem value="radiofrecventa">Radiofrecvență Bipolară</SelectItem>
                                                <SelectItem value="masaj">Masaj Vacuum Anticelulitic</SelectItem>
                                                <SelectItem value="presoterapie">Presoterapie (Drenaj Limfatic)</SelectItem>
                                                <SelectItem value="cavitatie">Cavitatie</SelectItem>
                                                <SelectItem value="impachetari">Împachetări Tunel IR</SelectItem>
                                                <SelectItem value="bronzare">Bronzare Organică cu DHA</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel className="text-[#6B4E32] font-semibold">Dermato Cosmetică</SelectLabel>
                                                <SelectItem value="dermapen">Dermapen cu Microneedling</SelectItem>
                                                <SelectItem value="microdermabraziune">Microdermabraziune</SelectItem>
                                                <SelectItem value="tratament">Tratament Clasic de Curățire</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Data</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild aria-label="Alegeți o dată">
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Alegeți o dată</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    field.onChange(date);
                                                    handleDateChange(date);
                                                }}
                                                disabled={(date) =>
                                                    date < new Date() ||
                                                    date > new Date(new Date().setMonth(new Date().getMonth() + 2)) ||
                                                    date.getDay() === 0 || date.getDay() === 6
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <input type="hidden" name="date" value={field.value ? field.value.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' }) : ''} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ora</FormLabel>
                                    <Select onValueChange={(value) => { field.onChange(value); setSelectedTime(value); }} defaultValue={selectedTime} name="time">
                                        <FormControl>
                                            <SelectTrigger aria-label="Selectați o oră">
                                                <SelectValue placeholder="Selectați o oră" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {availableTimes.length > 0 ? (
                                                availableTimes.map((time, index) => (
                                                    <SelectItem key={index} value={time}>
                                                        {time}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem disabled value="null">
                                                    Nicio oră disponibilă pentru această zi
                                                </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mesaj (opțional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Introduceți orice informații suplimentare aici"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {submitSuccess && (
                            <Alert className={`mb-6 ${submitSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                <div className="flex items-center">
                                    {submitSuccess ? (
                                        <CheckCircle className="h-6 w-6 mr-2" />
                                    ) : (
                                        <XCircle className="h-6 w-6 mr-2" />
                                    )}
                                    <div>
                                        <AlertTitle>{submitSuccess ? "Succes" : "Eroare"}</AlertTitle>
                                        <AlertDescription>{submitMessage}</AlertDescription>
                                    </div>
                                </div>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full bg-[#6B4E32] hover:bg-[#5A4129] text-white">
                            Trimiteți Programarea
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}