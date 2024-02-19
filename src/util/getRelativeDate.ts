import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function (date: Date): string {
    return format(date, 'P', { locale: ptBR });
}
