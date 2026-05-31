# TASKS_STRUCTURAL.md

MVP 차수에 직접 속하지 않는 구조 정리 작업이다. 기능 추가보다 유지보수성과 토큰 절약을 우선한다.

## 21. 구조 정리

### 렌더러 모듈 분리

- [x] config 모듈 분리
- [x] storage 모듈 분리
- [x] movement 모듈 분리
- [x] interaction 모듈 분리
- [x] state 모듈 분리
- [x] renderer.js를 초기화 진입점으로 축소

### sprite sheet renderer 전환 준비

- [x] CSS 픽셀 파츠와 sprite sheet 프레임 영역 분리
- [x] `data-cat-renderer` 렌더러 전환 계약 추가
- [x] 실제 sprite sheet 에셋 매핑 구조 설계
- [x] 상태/방향/프레임별 sprite 좌표 테이블 설계

### 작업 문서 경량화

- [x] `TASKS.md`를 인덱스로 축소
- [x] 1차 MVP 작업을 별도 파일로 분리
- [x] 2차 MVP 작업을 별도 파일로 분리
- [x] 3차 MVP 작업을 별도 파일로 분리
- [x] 4차 MVP 작업을 별도 파일로 분리
- [x] 과거 아카이브 파일을 링크 전용으로 축소
