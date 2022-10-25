function AddTodoForm({ todos, setTodos }) {
    const { session } = useSession();
    const [newTodo, setNewTodo] = useState("");
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (newTodo === "") {
        return;
      }
  
      const supabaseAccessToken = await session.getToken({
        template: "Supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken);
      const { data } = await supabase
        .from("todos")
        .insert({ title: newTodo, user_id: session.user.id });
        
      setTodos([...todos, data[0]]);
      setNewTodo("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
        &nbsp;<button>Add Todo</button>
      </form>
    );
  }