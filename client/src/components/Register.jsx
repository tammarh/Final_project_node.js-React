import { useForm } from "react-hook-form"
import axios from "axios"

export default function App() {
  const { register, handleSubmit } = useForm()
  const onSubmit = async(data) => {
    const res = await axios.post("http://localhost:9999/api/auth/register", data)
    console.log(data)
}


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  )
}