import { Field, Formik, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { clientMenuOptionsGrid, defaultDropdownState } from '../../../../constants';
import Button from '../../../UIKit/Button';
import ButtonsMenu from '../../../UIKit/ButtonsMenu';
import Input from '../../../UIKit/Input';
import Sidebar from '../../../UIKit/Sidebar';
import UncontrolledDropdown from '../../../UIKit/UncontrolledDropdown';
import styles from './styles.module.scss';
import Select from '../../../UIKit/Select';
import { getQuestionnaires } from '../../../../features/questionnairesSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { employeeErrorsSelector } from '../../../../features/employeesSlice';
import AsyncSelect from '../../../UIKit/AsyncSelect';
import { GridSearchParams } from '../../../../types/questionnaires';
import numWord from '../../../../utils/correctInducement';
import { DropdownItem } from '../../../../types';

type StateT = {
    state: any,
    setState: (data: any) => void,
    loadingOptions?: any
}

type PropsT = {
    // page: number,
    // limit: number,
    // order_by: 'asc' | 'desc',
    // employees: {
    //     state: [] | { label: string; value: string; }[],
    // },
    // country: {
    //     state: Array<{label: string, value:string}> | [],
    // },
    // city: {
    //     loadingOptions: (country: string) => Promise<any>,
    // },
    // state: {
    //     state: GridSearchParams,
    //     setState: (data:GridSearchParams) => void
    // },
    // indicator: number
    isOpen: boolean;
    setState: (e:boolean) => void,
    component: string,
    search: StateT,
    responsibility: StateT,
    sex: StateT,
    country: StateT,
    city: StateT,
    service_type: StateT,
    from_age: StateT,
    to_age: StateT,
    page: number,
    limit: number,
    is_archive: boolean,
    order_by?: 'asc' | 'desc',
    indicator: number,
    employeesState: Array<DropdownItem>,
    countryOptionsState: Array<DropdownItem>
}

function FindUsers({isOpen,sex, setState, component, page, limit, order_by, search, responsibility, country, city, service_type, from_age, to_age, indicator, employeesState, countryOptionsState}:PropsT) {
    const dispatch = useAppDispatch();

    const handleSexButtonChange = (value: string | undefined) => {
        if (value === '??????') sex.setState('male');
        if (value === '??????') sex.setState('female');
        if (value === '??????') sex.setState(undefined);
    }

    const handleSexVisual = (value: string | undefined) => {
        if (value === 'male') return '??????';
        if (value === 'female') return '??????';
        if (value === undefined) return '??????';
    }


    const words:Array<string> = ['????????????', '????????????', '??????????'];
    const resetFilters = () => {
        search.setState('');
        responsibility.setState('');
        sex.setState(undefined);
        country.setState('');
        city.setState('');
        service_type.setState('');
        from_age.setState('');
        to_age.setState('');
    }
    return(
        <Sidebar
            isOpen = {isOpen}
            onClose = {() => setState(false)}
            title={'?????????? ???? ??????????????'}
        >
                <div className={'formList'}>
                    <Formik
                        initialValues = {{}}
                        onSubmit = {(values) => {}}
                    >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        submitForm
                    }) => (
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Input
                            value={search.state}
                            // as={Input}
                            label = {'??????????'}
                            type={'text'}
                            wrapperClasses = {'item'}
                            name={'search'}
                            placeholder={'?????????? ???? ???????????????? ????????????'}
                            icon={'/icons/find.svg'}
                            onChange={(event:any) => search.setState(event.target.value)}
                        />
                        <Select
                            defaultValue={responsibility.state}
                            placeholder={'?????????????????????????? ??????????????????'}
                            className={'item'}
                            options={employeesState}
                            label={'??????????????????????????'}
                            onChange={(event) => {
                                if (event !== null) responsibility.setState(event.value);
                            }}
                        />
                        <ButtonsMenu
                            className={'item'}
                            label={'??????'}
                            buttons={['??????', '??????', '??????']}
                            handleValueChange={handleSexButtonChange}
                            defaultValue={handleSexVisual(sex.state)}
                        />
                        <div className={'item'}>
                            <label className={styles.label}>??????????????</label>
                            <div className={styles.wrapper}>
                                    <Input
                                        value={from_age.state}
                                        // as={Input}
                                        type={'text'}
                                        name={'ageFrom'}
                                        id={'ageFrom'}
                                        placeholder={'?????????????? ????'}
                                        wrapperClasses={styles.ageFrom}
                                        onChange={(event:any) =>from_age.setState(event.target.value)}
                                    />
                                    <div className={styles.separatorWrapper}>
                                        <img src="/icons/separator.svg"/>
                                    </div>
                                    <Input
                                        value={to_age.state}
                                        // as={Input}
                                        type={'text'}
                                        name={'ageTo'}
                                        id={'ageTo'}
                                        placeholder={'????'}
                                        wrapperClasses={styles.ageTo}
                                        onChange={(event:any) => to_age.setState(event.target.value)}
                                    />
                            </div>
                        </div>
                        <Select
                            defaultValue={country.state}
                            placeholder={'????????????'}
                            className={'item'}
                            options={countryOptionsState}
                            label={'????????????'}
                            onChange={(event) => {
                                if (event !== null) country.setState(event.value);
                            }}
                        />
                        <AsyncSelect
                            defaultValue={city.state}
                            className={'item'}
                            placeholder={'??????????'}
                            label={'??????????'}
                            searchable
                            loadingOptions={city.loadingOptions}
                            onChange={(event) => city.setState(event.value)}
                        />

                        <Select
                            defaultValue={service_type.state}
                            options={clientMenuOptionsGrid}
                            label={'???????????? ????????????'}
                            placeholder={'???????????? ????????????'}
                            onChange={(event) => service_type.setState(event.value)}
                        />


                        <div className={styles.sidebarFooter}>
                                <div className={styles.btnsContainer}>
                                    <Button
                                        color={'green'}
                                        type="submit"
                                        className={'sidebar-button'}
                                        onClick={() => setState(false)}
                                    >
                                        {`???????????????? ${indicator} ${numWord(indicator, words)}`}
                                    </Button >
                                    <Button
                                        color={'default'}
                                        // type={'button'}
                                        className={'sidebar-button'}
                                        onClick={() => {
                                            resetFilters();
                                            setState(false);
                                        }}
                                    >
                                        ???????????????? ??????????????
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

export default FindUsers;