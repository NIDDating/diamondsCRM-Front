import { Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { clientDropdownMenuOptions } from '../../../../../constants';
import Button from '../../../../UIKit/Button';
import Input from '../../../../UIKit/Input';
import Sidebar from '../../../../UIKit/Sidebar';
import UncontrolledDropdown from '../../../../UIKit/UncontrolledDropdown';
import styles from './styles.module.scss';
import { DatePicker, KeyboardDatePicker, KeyboardTimePicker, TimePicker } from "@material-ui/pickers";
import Select from '../../../../UIKit/Select';
import { dispatch } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useParams } from 'react-router';
import { getMakeDate, makeDate, questionnairesSelector } from '../../../../../features/questionnairesSlice';
import { authSelector } from '../../../../../features/authSlice';
import moment from 'moment';

type PropsT = {
    isOpen: boolean;
    setState: (e:boolean) => void
}

function MakeData({isOpen, setState}:PropsT) {
    const dispatch = useAppDispatch();

    const [selectedDate, handleDateChange] = useState<any>(new Date());
    const [selectedTime, handleTimeChange] = useState<any>(new Date());
    const [girls, setGirls] = useState();



    const id:any = useParams();
    const girlsList = useAppSelector(questionnairesSelector).girlsList;
    const currentInfo = useAppSelector(questionnairesSelector).current;

    const user = {
        name:currentInfo.my_information.name
    }

    useEffect(() => {
        if (isOpen) {
            dispatch(getMakeDate({ questionnaire_id: id.id}));
            setGirls(girlsList);
        }
    }, [isOpen]);

    let date = moment();
    let timezone = 'Europe/Moscow';
    let currentDate:any = moment();

    const initialValues: any = {
        name: user.name,
        date: currentDate.format('DD.MM.YYYY'),
        time: currentDate.format('hh:mm'),
        girl: ''
    }

    return(
        <Sidebar
            isOpen = {isOpen}
            onClose = {() => setState(false)}
            title={'?????????????????? ????????????????'}
        >

                <div className={'formList'}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit = {(values) => {
                            dispatch(makeDate({
                                questionnaire_id: id.id,
                                with_questionnaire_id: 1,
                                date: values.date,
                                time: values.time
                            }));
                        }}
                    >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                    }) => (
                    <form onSubmit={handleSubmit}>
                        <div className={'item'}>
                            <label className={'label'}>????????????</label>
                            <div className={styles.clientNameWrapper}>
                                <span>{values.name}</span>
                            </div>
                        </div>
                         <Select
                            placeholder={'???????????????? ??????????????'}
                            className = {'item'}
                            onChange={(event:any) => {setFieldValue('girl', event.value)}}
                            label={'??????????????'}
                            options={girls}
                        />
                        <div className={styles.meetingData}>
                        <div className={styles.fullwidth}>
                            <label className={'label'}>???????????????? ????????</label>
                            <DatePicker
                                className={'item'}
                                value={selectedDate}
                                onChange={(date:any) => {
                                    handleDateChange(date);
                                    setFieldValue('date', date);
                                }}
                                animateYearScrolling
                                minDate={new Date()}
                                format="DD.MM.yyyy"                                placeholder="?????????????? ???????? ????????????????"

                            />

                        </div>
                        <div className={styles.fullwidth}>
                            <label className={'label'}>???????????????? ??????????</label>
                            <TimePicker
                                placeholder="?????????????? ?????????? ????????????????"
                                ampm={false}
                                value={selectedTime}
                                onChange={(time:any) => {
                                    handleTimeChange(time);
                                    setFieldValue('time', time);
                                }}
                            />
                        </div>

                        </div>
                        <div className={'sidebar-footer'}>
                                <div className={'btns-container'}>
                                    <Button color={'green'}
                                        onClick={() =>setState(false)}
                                        className={`${styles.button} sidebar-button`}
                                        type="submit">
                                        ??????????????????
                                    </Button >
                                    <Button
                                        onClick={() =>setState(false)}
                                        color={'default'}
                                        className={`${styles.button} sidebar-button`}
                                    >
                                        ????????????????
                                    </Button>
                                </div>
                        </div>
                    </form>
                    )}
                    </Formik>
                </div>
        </Sidebar>
    );
}

export default MakeData;