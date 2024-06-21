import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";
import {
    useQuery
  } from '@tanstack/react-query'


const useUser = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const userEmail = user?.email;
  const {data: currentUser, isLoading, refetch} = useQuery({
    queryKey: ['user', userEmail],
    queryFn: async() =>{
        const res = await axiosSecure.get(`https://online-course-yoga-server-e15cda602871.herokuapp.com/user/${user?.email}`);
        return res.data;
    },
    enabled: !!user?.email && !!localStorage.getItem('token')
    })

    return {currentUser, isLoading, refetch}

}

export default useUser
