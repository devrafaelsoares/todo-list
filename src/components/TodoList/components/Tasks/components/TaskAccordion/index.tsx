import { ReactElement } from 'react';
import getRelativeDate from '@/util/getRelativeDate';
import { MdExpandLess } from 'react-icons/md';
import { BsCalendarDate } from 'react-icons/bs';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { PiTagSimpleLight } from 'react-icons/pi';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { FaTasks } from 'react-icons/fa';
import { FaRegTimesCircle } from 'react-icons/fa';
import { Task } from '@/types/task';
import { Status } from '@/data/status';
import { CheckTask, DeleteTask, EditTask } from '../../Operations/';
import '@/assets/styles/components/task-accordion.sass';

interface Props {
    data: Task;
}

export default function TaskAccordion({ data: { id, name, date, status, tag } }: Props): ReactElement {
    const dateRelative = getRelativeDate(date);

    return (
        <Accordion className="accordion">
            <AccordionSummary
                className="accordion__accordion-summary"
                expandIcon={<MdExpandLess />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <FaTasks />
                <Typography className="typography__title">{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className="typography__task-typography">
                    <span className="task-typography__status">
                        <BsCalendarDate className="task-row__icon" />
                        <span className="task-row__text">{dateRelative}</span>
                    </span>
                </Typography>
                <Typography className="typography__task-typography">
                    <span className="task-typography__status">
                        <PiTagSimpleLight className="task-row__icon" />
                        <span className="task-row__text">{tag}</span>
                    </span>
                </Typography>
                <div className="details__status-operation">
                    <Typography className="typography__task-typography">
                        <span className="task-typography__status">
                            {status === Status.NOT_COMPLETED && <FaRegTimesCircle className="status__icon" />}
                            {status === Status.COMPLETED && <AiOutlineCheckCircle className="status__icon" />}
                            <span className="status__text">{status}</span>
                        </span>
                    </Typography>
                    <div className="status-operation__operation">
                        {status === Status.NOT_COMPLETED && (
                            <div className="operations">
                                <CheckTask id={id} date={date} name={name} status={status} tag={tag} />
                                <EditTask id={id} date={date} name={name} status={status} tag={tag} />
                            </div>
                        )}
                        <div className="operations">
                            <DeleteTask id={id} date={date} name={name} status={status} tag={tag} />
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
