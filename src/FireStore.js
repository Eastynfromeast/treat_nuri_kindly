import { doc, setDoc } from 'firebase/firestore';
import { db } from './Firebase';
const testerDocumentRef = doc(db, 'nuri123/2023-05-01');

function FireStoreTester() {
	// setDoc(doc(db, 'nuri123', '2023-04-30'), {
	// 	createdAt: '2023-05-01',
	// 	treatList: [
	// 		{
	// 			createdAt: '04/30/2023, 11:27:05 PM',
	// 			title: '사슴고기 육포 3알',
	// 		},
	// 		{
	// 			createdAt: '04/30/2023, 11:27:37 PM',
	// 			title: '소고기 육포 3알',
	// 		},
	// 		{
	// 			createdAt: '04/30/2023, 11:27:41 PM',
	// 			title: '소고기 개껌 1개',
	// 		},
	// 		{
	// 			createdAt: '04/30/2023, 11:27:45 PM',
	// 			title: '오리고기 개껌 1개',
	// 		},
	// 	],
	// });
}

export default FireStoreTester;
