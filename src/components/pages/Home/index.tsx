import React, { useEffect } from "react";
import Container from "../../UIKit/Container";
import Input from "../../UIKit/Input";
import Navbar from "../../UIKit/Navbar";
import PageHeader from "../../components/Home/PageHeader";
import Stat from "../../components/Home/Stat";
import styles from './styles.module.scss';
import Separator from "../../UIKit/Separator";
import NewApplicationTable from "../../components/Home/NewApplicationsTable";
import { NewApplicationsRow, QuestionnairesCard } from "../../../types";
import generateQuestionnairesCards from "../../../utils/generateQuestionnairesCards";
import NewQuestionnairesGrid from "../../components/Home/NewQuestionnairesGrid";
import { useHistory } from "react-router";
import generateArchiveTableData from "../../../utils/generateTableData";
import Scrollbar from '../../UIKit/Scrollbar';
import { authSelector } from "../../../features/authSlice";
import { useSelector } from "react-redux";
import { GridSearchCardT } from "../../../types/questionnaires";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getQuestionnaires, getStats, questionnairesSelector } from "../../../features/questionnairesSlice";
import { ru } from "../../../constants";
import testData from "../../../test2";
import Loader from "react-loader-spinner";
import NotFound from "../../UIKit/NotFound";

function Home() {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const updateStats = () => {
        dispatch(getStats({}));
    }


    useEffect(() => {
        updateStats();
    }, [])

    useEffect(() => {
        dispatch(getQuestionnaires({
            limit: 8,
            page: 1,
            order_by: 'desc'
        }));
    }, [])


    const stats = useAppSelector(questionnairesSelector).stats;
    const loaded = useAppSelector(questionnairesSelector).statsLoaded;
    const last_applications = useAppSelector(questionnairesSelector).stats.last_applications;
    let grid_cards = useAppSelector(questionnairesSelector).questionnaires.questionnaires.filter((item:GridSearchCardT) => item.responsibility === null);

    const user = {
        name: useSelector(authSelector).username
    }

    const managers = {
        amountOfManagersOnline: stats.online_count
    }

    if (loaded) {
        return (
            <Scrollbar>
            <div className={'page'}>
                <PageHeader
                    name={user.name}
                    amountOfManagersOnline={managers.amountOfManagersOnline}
                />
                <Separator/>
                <div className={styles.mainContent}>
                    <Container mobileFull>
                        <div className={styles.label}>????????????????????</div>
                        <Stat/>

                        <div className={styles.label}>?????????? ????????????</div>
                        {last_applications.length > 0 ? <NewApplicationTable /> : <NotFound text={'?????? ?????????? ????????????'}/>}

                        <div className={styles.showAllButtonWrapper}>
                            <div className={styles.showAllButton}
                            onClick={() => {history.push('/applications')}}>
                                ???????????????????? ??????
                            </div>
                        </div>


                        <div className={styles.label}>?????????? ????????????</div>
                        {grid_cards.length > 0 ? <NewQuestionnairesGrid /> : <NotFound text={'?????? ?????????? ??????????'}/>}

                         <div className={styles.showAllButtonWrapper}>
                            <div className={styles.showAllButton}
                             onClick={() => {history.push('/questionnaires')}}>
                                ???????????????????? ??????
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            </Scrollbar>
        );
    }

    return (
        <div className={'loaderWrapper'}>
					<Loader
						type="Hearts"
						color="rgb(236, 154, 41)"
						height={100}
						width={100}
					/>
    </div>);

}

export default Home;