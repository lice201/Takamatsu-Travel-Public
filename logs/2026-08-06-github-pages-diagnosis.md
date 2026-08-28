# GitHub Pages 배포 오류 진단 — 2026-08-06

## 확인한 현재 상태
- 저장소 `lice201/Takamatsu-Travel`는 현재 private 저장소이며 GitHub Pages가 활성화되어 있지 않다(`has_pages: false`).
- 최근 커밋에서 `docs/` 정적 스냅샷이 이미 생성되었다.
- `docs/index.html`과 `docs/.nojekyll`이 존재하므로 GitHub Pages의 `Deploy from a branch -> main /docs` 방식으로 배포 가능한 구조다.
- 현재 Next/vinext 원본은 Cloudflare/ChatGPT Sites용 서버 빌드 구조이며, GitHub Pages에 원본 빌드 산출물을 직접 올리는 방식은 적합하지 않다.

## 가장 가능성 높은 오류 원인
1. private 저장소에서 GitHub Free 계정을 사용 중인 경우 Pages 배포 권한이 없음.
2. Pages의 publishing source가 아직 설정되지 않음.
3. 이미 준비된 `docs/` 대신 GitHub Actions 또는 vinext 서버 빌드를 배포하려고 시도함.

## 권장 해결 절차
### 방법 A — 현재 저장소를 공개 저장소로 전환
1. Settings -> General -> Danger Zone -> Change repository visibility -> Public.
2. Settings -> Pages.
3. Build and deployment의 Source를 `Deploy from a branch`로 선택.
4. Branch `main`, Folder `/docs` 선택 후 Save.
5. 예상 주소: `https://lice201.github.io/Takamatsu-Travel/`.

### 방법 B — 원본 저장소는 private 유지
1. 공개 배포 전용 저장소를 별도로 생성한다.
2. 루트 주소를 원하면 저장소 이름을 `lice201.github.io`로 만든다.
3. 현재 저장소의 `docs/` 내부 파일들을 새 저장소 루트에 복사한다.
4. 새 저장소 Settings -> Pages -> Deploy from a branch -> main /root.
5. 예상 주소: `https://lice201.github.io/`.

## 추가 참고
- 현재 `docs/index.html`의 Open Graph, favicon 메타 주소는 기존 ChatGPT Sites 주소를 가리키므로 배포 자체와는 무관하지만 추후 GitHub Pages 주소로 수정하는 것이 좋다.
- `docs/` 정적 스냅샷을 사용할 경우 GitHub Actions workflow나 `vinext build`를 Pages 배포 단계에서 다시 실행할 필요가 없다.
