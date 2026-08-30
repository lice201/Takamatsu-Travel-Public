# Travel Log lightbox and day navigation

## 구현 내용

- `PhotoSequence`의 실제 사진을 누르면 현재 사진 묶음 안에서만 이동하는 전체 화면 라이트박스를 열도록 구현했다.
- 닫기, 배경 클릭, `Escape`, 좌우 방향키, 이전/다음 버튼을 지원한다.
- 라이트박스가 열리면 배경 스크롤을 잠그고, 포커스를 내부에 가두며, 닫을 때 원래 사진 버튼으로 포커스를 돌려준다.
- 캡션과 현재 사진 번호를 표시하고, 모바일 및 `prefers-reduced-motion` 환경을 별도로 처리했다.
- DAY 1~4와 YADON으로 이동하는 단일 고정 내비게이션을 추가했다.
- `IntersectionObserver`로 현재 구간을 표시하고, YADON 구간에는 안정적인 `theme-yadon` 앵커를 부여했다.
- 기존 Hero 내비게이션을 교체해 중복 UI를 제거했다.

## 콘텐츠 보존

- 선택 사진 121장의 순서와 `caption`, `alt`, `layout`, `size`, `group`, `objectPosition`, `objectFit` 값을 작업 전후 비교했다.
- 사진 누락 및 중복은 없으며 실제 JPG 126개를 유지했다.
- 사용자가 수정한 메리켄야 식당명·지점·주소와 DAY 1 캡션을 그대로 포함했다.
- Hero 및 Epilogue 이미지는 라이트박스 대상에서 제외했다.

## 검증

- `npm run lint`: 성공, 오류 0개. 기존 및 의도된 raw image 경고 18개.
- `npm run build`: 성공.
- `npm test`: 6/6 성공.
- `npm run build:pages`: 성공.
- `npm run verify:pages`: 성공. basePath, 121개 선택 사진, 126개 JPG, 내비게이션 앵커와 라이트박스 트리거 확인.
- 자동 브라우저 QA는 Windows 브라우저 런타임 초기화 오류로 실행하지 못했으며 정적 HTML, 클라이언트 자산, 소스 기반 상호작용 검증으로 보완했다.

## 구현 커밋

- `691eb5aaddf60c31bb26ee2741b52c0199d2a5d7`
