export default async function handler(req, res) {
  
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  /*try {
    const websiteRef = collection(db, 'Tasks');
    const snapshot = await getDocs(websiteRef);
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting task' });
  }*/
}
