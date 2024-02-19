import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bookmark, BookmarkIcon, CalendarDays, ListChecks } from 'lucide-react';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Calendar } from '@/components/ui/calendar';
import { useContext, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { tags } from '@/data/tags';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TaskContext } from '@/contexts/TaskContext';
import { Status } from '@/data/status';
import { useToast } from '@/components/ui/use-toast';
import toCapitalize from '@/util/toCapitalize';
import { Operation } from '@/types/operations';
import { DialogTaskProps } from '@/types/dialog-task';

type TaskSchemaType = z.infer<typeof TaskSchema>;

const TaskSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Campo obrigatório').trim(),
    tag: z
        .string()
        .min(1, 'Campo obrigatório')
        .transform(word => toCapitalize(word)),
    date: z.date({ required_error: 'Campo obrigatório' }),
});

const INITIAL_TASK_VALUE = { id: '', name: '', date: undefined, tag: '' };

export default function Index({ title, description, openModal, setOpenModal, task, operation }: DialogTaskProps) {
    const { toast } = useToast();
    const [openSelectTag, setOpenSelectTag] = useState(false);
    const [openSelectData, setOpenSelectData] = useState(false);
    const { addTask, editTask, isExistTaskByName, findTaskByName, findTaskById } = useContext(TaskContext);

    const form = useForm<TaskSchemaType>({
        resolver: zodResolver(TaskSchema),
        defaultValues: operation === 'update' ? task : INITIAL_TASK_VALUE,
    });

    const {
        control,
        formState: { errors },
    } = form;

    function sendToastCreateOrUpdate(operation: Operation, { name, tag, date }: TaskSchemaType): void {
        const operationText = operation === 'create' ? 'criado' : 'atualizado';
        toast({
            title: `✔ Tarefa ${operationText} com sucesso`,
            description: (
                <div className="flex flex-col gap-2 text-[1.2em] font-bold">
                    <div className="flex items-center gap-2">
                        <ListChecks />
                        <span>{name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bookmark />
                        <span>{tag}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CalendarDays />
                        <span>{format(date, 'P', { locale: ptBR })}</span>
                    </div>
                </div>
            ),
            variant: 'success',
        });
    }

    function registerTask({ name, tag, date }: TaskSchemaType): void {
        if (isExistTaskByName(name)) {
            toast({
                title: `✕ Tarefa já registrada`,
                variant: 'destructive',
            });
            form.reset(INITIAL_TASK_VALUE);
            setOpenModal(false);
            return;
        }
        addTask({ id: uuidv4(), name, tag, status: Status.NOT_COMPLETED, date });
        sendToastCreateOrUpdate('create', { name, tag, date });
        form.reset(INITIAL_TASK_VALUE);
    }

    function updateTask({ id, name, tag, date }: TaskSchemaType): void {
        const taskFoundRegistered = findTaskByName(name);
        if (taskFoundRegistered?.name !== task?.name && isExistTaskByName(name)) {
            toast({
                title: `✕ Tarefa já registrada`,
                variant: 'destructive',
            });
            setOpenModal(false);
            form.reset(task);
            return;
        }
        const taskFoundEditable = findTaskById(id as string);
        if (taskFoundEditable) {
            editTask({ ...taskFoundEditable, name, date, tag });
            sendToastCreateOrUpdate('update', { name, tag, date });
        }
        form.reset({ id, name, tag, date });
    }

    function onSubmit({ id, name, tag, date }: TaskSchemaType): void {
        switch (operation) {
            case 'create':
                registerTask({ name, tag, date });
                break;
            case 'update':
                updateTask({ id, name, tag, date });
                break;
        }
        setOpenModal(false);
    }

    return (
        <Dialog
            open={openModal}
            onOpenChange={value => {
                form.reset(task);
                setOpenModal(value);
            }}
        >
            <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={e => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={control}
                            name="id"
                            render={({ field }) => <Input id="id" type="hidden" {...field} />}
                        />
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem onFocus={e => e.preventDefault()}>
                                    <FormControl>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-start">
                                                    Nome
                                                </Label>
                                                <Input
                                                    id="name"
                                                    className={cn(
                                                        'col-span-3 focus:border-gray-100',
                                                        errors.name && 'border-red-500'
                                                    )}
                                                    placeholder="Insira um nome para a tarefa"
                                                    {...field}
                                                />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="tag"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="tag" className="text-start">
                                                Categoria
                                            </Label>
                                            <Popover open={openSelectTag} onOpenChange={setOpenSelectTag}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            id="tag"
                                                            role="combobox"
                                                            aria-expanded={openSelectTag}
                                                            className={cn(
                                                                'col-span-3 justify-between gap-2 focus:border-gray-100',
                                                                !field.value && 'text-muted-foreground',
                                                                errors.tag && 'border-red-500'
                                                            )}
                                                        >
                                                            <BookmarkIcon className="h-4 w-4 shrink-0" />
                                                            <span className="w-full text-start font-normal">
                                                                {field.value
                                                                    ? tags.find(
                                                                          tag =>
                                                                              tag.value.toUpperCase() ===
                                                                              field.value.toUpperCase()
                                                                      )?.label
                                                                    : 'Defina uma tag'}
                                                            </span>
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Procure uma tag" className="h-9" />
                                                        <CommandEmpty>Nenhuma tag foi encontrada</CommandEmpty>
                                                        <CommandGroup>
                                                            {tags.map(tag => (
                                                                <CommandItem
                                                                    className="cursor-pointer"
                                                                    key={tag.value}
                                                                    value={tag.value}
                                                                    onSelect={value => {
                                                                        field.onChange(value);
                                                                        setOpenSelectTag(false);
                                                                    }}
                                                                    autoCapitalize="none"
                                                                >
                                                                    {tag.label}
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            'ml-auto h-4 w-4',
                                                                            tag.value === field.value
                                                                                ? 'opacity-100'
                                                                                : 'opacity-0'
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="date" className="text-start">
                                                Data
                                            </Label>
                                            <Popover open={openSelectData} onOpenChange={setOpenSelectData}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                'col-span-3 justify-start text-left font-normal',
                                                                !field.value && 'text-muted-foreground',
                                                                errors.date && 'border-red-500'
                                                            )}
                                                            aria-expanded={openSelectData}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {field.value ? (
                                                                format(field.value, 'P', { locale: ptBR })
                                                            ) : (
                                                                <span>Selecione uma data</span>
                                                            )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        fromDate={addDays(new Date(), 1)}
                                                        mode="single"
                                                        locale={ptBR}
                                                        selected={field.value}
                                                        onSelect={value => {
                                                            field.onChange(value);
                                                            setOpenSelectData(false);
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="gap-2 mt-2">
                            <DialogClose asChild>
                                <Button type="button" variant="destructive">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit">{operation === 'create' ? 'Criar' : 'Atualizar'} tarefa</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
