import { db } from "../../../lib/firebase";


export default async function handler(req, res) {
    if (req.method === "GET") {
        getTaskHandler(req, res);

    } else if (req.method === "POST") {
        createTaskHandler(req, res);

    } else if (req.method === "PUT") {
        updateTaskHandler(req, res);

    } else if (req.method === "DELETE") {
        deleteTaskHandler(req, res);
    } 
   
}

const getTaskHandler = async (req, res) => {
    try {
        const posts = await db.collection('tasks').get();
        const tasks = posts.docs.map((doc) =>  ({ reference: doc.id, ...doc.data() }));
        res.status(200).json(tasks );
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Something went wrong' });
    }

}


const createTaskHandler = async (req, res) => {
    const { id, text, done } = req.body;

    try {
        const newTask = {
            id: id,
            text: text,
            done: done,
        };
        const ref = await db.collection('tasks').add(newTask);
        //const task = await ref.get();
        const task = {
            ...newTask,
            reference: ref.id  // Agrega la referencia al objeto task
        };
        res.status(200).end(JSON.stringify(task));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const updateTaskHandler = async (req, res) => {
    const { id, text, done, reference } = req.body;

    try {
        const taskRef = db.collection('tasks').doc(reference);
        const task = await taskRef.get();

        if (!task.exists) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            const updatedTask = {
                id: id,
                text: text || task.data().text, // Use existing text if text is not provided
                done: done || task.data().done,
                reference: reference // Use existing done value if done is not provided
            };
            await taskRef.update(updatedTask);
            res.status(200).end(JSON.stringify(updatedTask));
           
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

const deleteTaskHandler = async (req, res) => {
    const { reference } = req.query;

    try {
        const taskRef = db.collection('tasks').doc(reference);
        const task = await taskRef.get();

        if (!task.exists) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            await taskRef.delete();
            res.status(200).json({ message: 'Task deleted successfully' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Something went wrong' });
    }
}


