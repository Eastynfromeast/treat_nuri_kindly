import { getDoc, doc } from 'firebase/firestore';

export async function getComments(nickname) {
	const comments = doc(db, 'comments', nickname);
	const commentsSnapshot = await getDoc(comments);

	if (!commentsSnapshot.exists()) {
		return null;
	}

	return commentsSnapshot.data();
}
