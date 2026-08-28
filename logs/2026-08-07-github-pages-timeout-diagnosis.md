# GitHub Pages 배포 타임아웃 진단 — 2026-08-07

## 대상
- 공개 저장소: `lice201/takamatsu-summer-2026`
- 공개 예정 URL: `https://lice201.github.io/takamatsu-summer-2026/`
- 실패 워크플로: `Deploy static site to Pages #5`
- 실패 run ID: `31113055508`

## 실제 로그 확인 결과
- checkout 성공
- configure-pages 성공
- upload-pages-artifact 성공
- 업로드된 Pages artifact: 약 9.5MB, 정상 완료
- `actions/deploy-pages@v4`가 Pages deployment를 정상 생성함
- 이후 상태가 10분 동안 계속 `deployment_in_progress`에 머무름
- 기본 timeout 600000ms(10분)에 도달해 `Timeout reached, aborting!`으로 실패
- 화면에 표시된 Node 20 및 `punycode` 경고는 실패 원인이 아님

## 추가 원인 후보
현재 워크플로는 다음 설정을 사용한다.

```yaml
concurrency:
  group: pages
  cancel-in-progress: true
```

실제 이전 run은 다음 수동 run이 시작되면서 deploy 단계에서 취소되었다. Pages 배포가 진행 중인 상태에서 반복 실행하고 기존 deployment를 취소한 것이 backend 배포 상태를 불안정하게 만들었을 가능성이 높다.

## 권장 해결 순서
### 가장 안정적인 방법
현재 공개 저장소 루트에 이미 `index.html`, `.nojekyll`, 이미지가 있으므로 GitHub Actions를 사용하지 않고 branch deployment로 전환한다.

- Settings → Pages
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/(root)`
- Save
- `.github/workflows/deploy.yml` 삭제 또는 비활성화

### Actions 방식을 유지할 경우
- `cancel-in-progress: false`로 변경
- `actions/checkout@v6`
- `actions/upload-pages-artifact@v4`
- deploy-pages timeout을 20분 이상으로 일시 확장
- 동시에 여러 번 재실행하지 않고 한 번만 실행

예시:

```yaml
concurrency:
  group: pages
  cancel-in-progress: false

steps:
  - uses: actions/checkout@v6
  - uses: actions/configure-pages@v5
  - uses: actions/upload-pages-artifact@v4
    with:
      path: .
  - id: deployment
    uses: actions/deploy-pages@v4
    with:
      timeout: 1200000
```

## 결론
이번 실패는 정적 파일 누락이나 HTML 빌드 오류가 아니라 GitHub Pages backend deployment가 `deployment_in_progress`에서 완료되지 않고 10분 timeout에 걸린 사례다. 현재 구조에서는 branch deployment로 전환하는 것이 가장 단순하고 안정적이다.
