import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/post/${slug}`);
                const result = await response.json();
                setPost(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [slug]);

    if (!post) return <p>Loading...</p>;

    return (
        <div style={{ padding: 20 }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
        </div>
    );
}
