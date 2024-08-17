import React, { useEffect, useState } from 'react'
import { Sidebar, Card, FolderTree, Welcome, Topbar } from '../../Components'
import './index.css'
import CareerGoal from './Components/CareerGoal';
import Documents from './Components/Documents';
import { useApiCall } from '../../hooks';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Home({ params }) {
  const { typeOfUser } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPersonalData, setUserPersonalData] = useState(null);
  const [careerGoalData, setCareerGoalData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);

  useEffect(() => {
    axios.get('https://api.jsonbin.io/v3/b/66a878a5e41b4d34e4190c12')
      .then((res) => {
        setUserData(res.data.record.data);
        setUserPersonalData(res.data.record.data);
      })

    axios.get('https://api.jsonbin.io/v3/b/66a87a90ad19ca34f88ecd65')
      .then((res) => {
        setDocumentsData(res.data.record.data);
      })

    if (typeOfUser==="managed") axios.get('https://api.jsonbin.io/v3/b/66a87a3ae41b4d34e4190ccc')
      .then((res) => {
        setCareerGoalData(res.data.record.data);
      }).catch((err) => {
        console.log(err);
      })

  }, [])

  const renderDashboardContent = () => {
    return (
      typeOfUser === "managed" && careerGoalData && documentsData
        ? <div style={{ display: "flex", flexDirection: "row", marginTop: "3.5rem", gap: "2rem" }}>
          {careerGoalData && <CareerGoal careerGoal={careerGoalData[0]} />}
          {documentsData && <Documents documents={documentsData} />}
        </div>
        : <div style={{ display: "flex", flexDirection: "row", marginTop: "3.5rem", gap: "2rem" }}>
          {documentsData && <Documents documents={documentsData} />}
        </div>
    )
  }

  return (
    <>
      <Sidebar profile_picture_url={userData?.profile_picture_url} />
      <Topbar userPersonalData={userPersonalData} />
      <div className='main container'>
        <Welcome style={{ marginTop: '3rem' }} userPersonalData={userPersonalData} typeOfUser={typeOfUser} />
        {renderDashboardContent()}
      </div>
    </>
  )
}
