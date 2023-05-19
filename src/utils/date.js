import AddDailyTreats from '../AddDailyTreats';

export class DateUtils {
	getTodayDate = () => {
		let now = new Date();
		let todayYear = now.getFullYear();
		let todayMonth = leftPad(now.getMonth() + 1);
		let todayDate = leftPad(now.getDate());
		return todayYear + '-' + todayMonth + '-' + todayDate;
		// let nowForTitle = new Intl.DateTimeFormat('ko-KR', {
		// 	year: 'numeric',
		// 	month: '2-digit',
		// 	day: '2-digit',
		// }).format(now);
		// return nowForTitle;
	};

	leftPad(value) {
		if (value >= 10) {
			return value;
		}
		return `0${value}`;
	}

	getCreatedAt() {
		let createdDate = new Date();
		let createdAt = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).format(createdDate);

		return createdAt;
	}
}

/*
시작
1. View 가 초기화 
2. 데이타를 로드 
3. 데이타에 맞게 다시 View 랜더링 

업데이트
2 -> 3 반복 



아이템 삭제하기
변수명 변경 -> 단수 복수 구분이 명확해야

*/
