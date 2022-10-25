// imports to add:
import { useState, useEffect } from "react";
import { useSession } from "@clerk/nextjs";
import styles from "../styles/Home.module.css";

// ... rest of code ...

const TodoList = ({ todos, setTodos }) => {
  const { session } = useSession();
  const [loading, setLoading] = useState(true);

  // on first load, fetch and set todos
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const supabaseAccessToken = await session.getToken({
          template: "Supabase",
        });
        const supabase = await supabaseClient(supabaseAccessToken);
        const { data: todos } = await supabase.from("todos").select("*");
        setTodos(todos);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  // if loading, just show basic message
  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  // display all the todos
  return (
    <>
      {todos?.length > 0 ? (
        <div className={styles.todoList}>
          <ol>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className={styles.label}>You dont have any todos!</div>
      )}
    </>
  );
};