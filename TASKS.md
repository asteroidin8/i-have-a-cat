# TASKS.md

토큰 절약을 위한 작업 인덱스다. 매 작업 시작 시 이 파일만 먼저 읽고, 필요한 차수의 상세 파일 하나만 추가로 연다.

## 읽기 순서

1. 현재 작업이 구조 정리이면 `TASKS_STRUCTURAL.md`만 읽는다.
2. 1차 MVP 이력은 `TASKS_MVP_1.md`를 읽는다.
3. 2차 MVP 구현 이력과 체감 품질 재검증은 `TASKS_MVP_2.md`를 읽는다.
4. 3차 MVP 작업은 `TASKS_MVP_3.md`를 읽는다.
5. 4차 MVP 작업은 `TASKS_MVP_4.md`를 읽는다.

## 현재 우선순위

- 구조 정리: `TASKS_STRUCTURAL.md`
- 2차 MVP 체감 품질 재검증: `TASKS_MVP_2.md`
- 3차 MVP 남은 경험 개선: `TASKS_MVP_3.md`
- 4차 MVP 조용한 공존 리듬: `TASKS_MVP_4.md`

## 운영 규칙

- `TASKS.md`에는 전체 체크리스트를 다시 넣지 않는다.
- 완료 이력과 세부 항목은 차수별 파일에만 기록한다.
- 새 작업이 여러 차수에 걸치면 현재 실제로 수정할 차수 파일 하나와 `TASKS_STRUCTURAL.md`만 우선 갱신한다.
- 과거 호환용 `TASKS_ARCHIVE.md`는 상세 목록을 보관하지 않고 차수별 파일 링크만 둔다.
