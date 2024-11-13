import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewPost() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:8080/api/post", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            response.ok ? setMessage("Post created successfully!") : setMessage("Post creation failed!");
        } catch (error) {
            setMessage("Error occurred!");
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("slug", { required: true })} placeholder="Slug" />
            {errors.slug && <p>Slug is required</p>}

            <input type="text" {...register("title", { required: true })} placeholder="Title" />
            {errors.title && <p>Title is required</p>}

            <input type="text" {...register("description", { required: true })} placeholder="Description" />
            {errors.description && <p>Description is required</p>}

            <button type="submit">Add New Post</button>
            <p>{message}</p>
        </form>
    );
}
