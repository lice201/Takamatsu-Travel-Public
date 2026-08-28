# GitHub Pages public deployment

- 기존 구조: `lice201/Takamatsu-Travel` 비공개 저장소의 Next/vinext 사이트. 현재 요금제에서는 비공개 저장소 GitHub Pages를 사용할 수 없어 공개 복사본을 별도로 구성했다.
- 공개 저장소: `lice201/Takamatsu-Travel-Public`. 비공개 저장소의 과거 Git 기록은 복사하지 않고 검증된 현재 스냅샷만 새 이력으로 시작한다.
- static export: Pages 빌드에서 `output: "export"`와 trailing slash를 활성화하며 vinext가 `dist/client`에 정적 파일을 생성한다.
- base path: Pages 빌드에서 Vite asset base와 `NEXT_PUBLIC_BASE_PATH`를 `/Takamatsu-Travel-Public`으로 설정한다. 로컬 개발에서는 빈 base path를 사용한다.
- asset path: `withBasePath()`로 공개 이미지와 내부 `/plan/` 링크를 처리한다. CSS와 JavaScript는 Vite base가 처리한다.
- root route: `/`가 `/travel-log` 페이지를 직접 재사용하므로 client-side redirect 없이 실제 여행기를 렌더링한다. 기존 계획 페이지는 `/plan/`에 보존한다.
- workflow: `.github/workflows/deploy-pages.yml`이 `main` push와 수동 실행을 지원하며 공식 GitHub Pages Actions를 사용한다.
- export directory: `dist/client`.
- 이미지 검증: DAY 1 12장, DAY 2 35장, DAY 3 35장, DAY 4 24장, Takagi-san 6장, Yadon 14장으로 총 126장을 검사한다. Hero `day2-03.jpg`와 Epilogue `day4-24.jpg`도 포함한다.
- 검증 명령: `npm run lint`, `npm run build`, `npm test`, `npm run build:pages`, `npm run verify:pages`.
- Pages 설정: 공개 저장소 생성 및 첫 push 후 GitHub Actions source로 활성화한다.
- 실제 배포 URL: `https://lice201.github.io/Takamatsu-Travel-Public/`.
- 남은 수동 작업: 없음. 배포 완료 후 workflow와 실제 HTTP asset 응답을 확인한다.
- 기준 소스 커밋: 비공개 저장소 `2624807af22d9b58bbc140e910596178de953428`.
- 공개 저장소 초기 commit SHA: `f03a4aafbe4e44e7b423e65b45916f0a276b0203`.
