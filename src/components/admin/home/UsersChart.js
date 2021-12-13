import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import { getAllUsers } from '../../../services/firebase';
import Loading from '../../Loading';

const UsersChart = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoaading, setIsLoading] = useState(true);
  const [allUsersDate, setAllUsersDate] = useState([]);
  const [arrayForChart, setArrayForChart] = useState([]);

  useEffect(() => {
    async function getUsers() {
      await getAllUsers(setAllUsers, setIsLoading);
    }

    getUsers();

    return () => {
      setAllUsers([]);
      setIsLoading(true);
    };
  }, []);

  useEffect(() => {
    allUsers.map((user) => {
      const d = new Date(user.dateCreated);
      setAllUsersDate((oldArray) => [
        `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${
          d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
        }`,
        ...oldArray
      ]);
      return null;
    });
  }, [allUsers]);

  useEffect(() => {
    const table = [];
    allUsersDate.map((date) => {
      if (table.filter((tab) => tab.x === date).length > 0) {
        const index = table.findIndex((tab) => tab.x === date);

        table[index] = { x: date, y: table[index].y + 1 };
      } else {
        table.push({ x: date, y: 1 });
      }

      return null;
    });

    setArrayForChart(table);
  }, [allUsersDate]);

  if (isLoaading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Bar
        data={{
          datasets: [
            {
              label: 'users',
              data: arrayForChart,
              backgroundColor: ['rgba(45, 83, 246, 0.2)'],
              borderColor: ['rgba(45, 83, 246, 1)'],
              borderWidth: 1
            }
          ]
        }}
        height={400}
        width={600}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};

export default UsersChart;
