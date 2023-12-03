import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      fetch('http://traineeapp.azurewebsites.net/api/trainings')
        .then(response => response.json())
        .then(data => {
          console.log('Data from API:', data);
          setTrainings(data.content);
        });
    };

    if (trainings.length === 0) {
      return <p>Loading...</p>; // or any loading indicator you prefer
    }
  
    // Group data by activity
    const groupedData = _.groupBy(trainings, 'activity');
  
    // Calculate the total duration for each activity
    const summedData = _.map(groupedData, (activities, activity) => ({
      activity,
      minuuttia: _.sumBy(activities, 'duration'),
    }));
  
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={summedData}>
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="minuuttia" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }