import React, { useState, useRef, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { HiddenComponent } from '../../components/HiddenComponent';
import { Timer } from '../../components/Timer';
import { selectEndDate, selectStatus } from '../../redux/planning/selectors';
import { useAppSelector } from '../../hooks';
import { calcStartOfNextYear, calcDurationTime } from '../../utils';
import { defaultTime, planningStatuses } from '../../constants/';
import * as S from './TimeSection.styled';

export const TimeSection: React.FC = () => {
    const endDate = useAppSelector(selectEndDate);
    const status = useAppSelector(selectStatus);
    const [startOfNextYear, setStartOfNextYear] = useState<Date>(() =>
        calcStartOfNextYear()
    );

    const [currentDateForTimeToEndOfYear, setCurrentDateForTimeToEndOfYear] =
        useState<Date>(new Date());
    const [currentDateForTrainingTime, setCurrentDateForTrainingTime] =
        useState<Date>(new Date());

    const [isStoppedTrainingTimer, setIsStoppedTrainingTimer] =
        useState<boolean>(
            () =>
                status === planningStatuses.finished ||
                status === planningStatuses.timeover
        );

    const timerToEndOfYearIntervalId = useRef<NodeJS.Timer>();
    const trainingTimerIntervalId = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (
            status === planningStatuses.finished ||
            status === planningStatuses.timeover
        ) {
            setIsStoppedTrainingTimer(true);
        }
    }, [status]);

    useEffect(() => {
        timerToEndOfYearIntervalId.current = setInterval(() => {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const startDateUtc = toZonedTime(new Date(), timeZone);
            const endDateUtc = toZonedTime(startOfNextYear, timeZone);

            const difference = differenceInSeconds(endDateUtc, startDateUtc);

            if (difference <= 0) {
                setStartOfNextYear(calcStartOfNextYear());
                clearInterval(timerToEndOfYearIntervalId.current);
            }

            setCurrentDateForTimeToEndOfYear(new Date());
        }, 1000);

        return () => {
            clearInterval(timerToEndOfYearIntervalId.current);
        };
    }, [startOfNextYear]);

    useEffect(() => {
        if (isStoppedTrainingTimer) {
            return;
        }

        trainingTimerIntervalId.current = setInterval(() => {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const startDateUtc = toZonedTime(new Date(), timeZone);
            const endDateUtc = toZonedTime(
                new Date(`${endDate}T00:00:00`),
                timeZone
            );

            const difference = differenceInSeconds(endDateUtc, startDateUtc);

            if (difference <= 0) {
                setIsStoppedTrainingTimer(true);
                clearInterval(trainingTimerIntervalId.current);
            }

            setCurrentDateForTrainingTime(new Date());
        }, 1000);

        return () => {
            clearInterval(trainingTimerIntervalId.current);
        };
    }, [endDate, isStoppedTrainingTimer]);

    const timeToEndOfYear = calcDurationTime(
        currentDateForTimeToEndOfYear,
        startOfNextYear
    );

    const remainingTimeInTraining = isStoppedTrainingTimer
        ? defaultTime
        : calcDurationTime(
              currentDateForTrainingTime,
              new Date(`${endDate}T00:00:00`)
          );

    return (
        <S.Container>
            <HiddenComponent>
                <h2>Секція відліку часу</h2>
            </HiddenComponent>

            <Timer
                time={timeToEndOfYear}
                title="До закінчення року залишилось"
            />

            {endDate && (
                <Timer
                    time={remainingTimeInTraining}
                    title="До досягнення мети залишилось"
                />
            )}
        </S.Container>
    );
};
