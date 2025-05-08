import { Table, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useEffect, useState } from 'react';
import EditWorkout from '../components/EditWorkout';
import AddWorkout from '../components/AddWorkout';
import DeleteWorkout from '../components/DeleteWorkout';
import UpdateWorkoutStatus from '../components/UpdateWorkoutStatus';
import logo from '../assets/FC.png';

export default function Home() {
  const { user } = useContext(UserContext);

  const [workoutData, setWorkoutData] = useState([]);

  function getWorkoutData() {
    if (user.id !== null) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (Array.isArray(data.workouts)) {
            setWorkoutData(
              data.workouts.map((workout) => {
                const formattedDate = new Date(
                  workout.dateAdded
                ).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: '2-digit',
                });

                return (
                  <tr key={workout._id}>
                    <td>{formattedDate}</td>
                    <td>{workout.name}</td>
                    <td>{workout.duration}</td>
                    <td>
                      {workout.status === 'pending' ? (
                        <i class="bi bi-gear-fill"></i>
                      ) : (
                        <i class="bi bi-check-circle-fill"></i>
                      )}
                    </td>
                    <td>
                      <EditWorkout
                        workout={workout}
                        getWorkoutData={getWorkoutData}
                      />
                    </td>
                    <td>
                      <DeleteWorkout
                        workout={workout}
                        getWorkoutData={getWorkoutData}
                      />
                    </td>
                    <td>
                      <UpdateWorkoutStatus
                        workout={workout}
                        getWorkoutData={getWorkoutData}
                      />
                    </td>
                  </tr>
                );
              })
            );
          } else {
            setWorkoutData([]);
          }
        });
    }
  }

  useEffect(() => {
    getWorkoutData();
  }, [user]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card className="p-4 text-center bg-dark">
        <Card.Body>
          <img
            src={logo}
            alt="FC Logo"
            width="200"
            height="auto"
            className="img-fluid"
          />
          <h1>Welcome to FitCheck!</h1>
          <div className="d-flex justify-content-center">
            <h6
              className="text-light text-center py-3"
              style={{ maxWidth: '400px' }}
            >
              Your personal fitness companion, designed to keep you accountable,
              motivated, and crushing those goals.
            </h6>
          </div>

          {user.id !== null ? (
            workoutData.length > 0 ? (
              <>
                <h4 className="mt-3 " style={{ fontWeight: 'bold' }}>
                  My Workouts
                </h4>
                <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Workout</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th colSpan={3}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{workoutData}</tbody>
                  </Table>
                </div>
                <AddWorkout getWorkoutData={getWorkoutData} />
              </>
            ) : (
              <>
                <p
                  className="text-center fw-light fs-6 text-warning"
                  style={{ maxWidth: '400px' }}
                >
                  You have no workout record yet.
                </p>
                <AddWorkout getWorkoutData={getWorkoutData} />
              </>
            )
          ) : (
            <>
              <p
                className="text-center fw-light fs-6"
                style={{ maxWidth: '400px' }}
              >
                Track your workouts, monitor your progress, and stay ahead of
                the curve with insights tailored to YOU. No more guesswork—just
                results.
              </p>

              <Link to="/register" className="btn btn-warning w-100 mt-3">
                <i class="bi bi-person-arms-up"></i> Get Started
              </Link>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
