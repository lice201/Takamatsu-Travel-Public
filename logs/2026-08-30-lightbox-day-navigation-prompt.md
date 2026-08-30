# Lightbox + DAY navigation prompt

요청: 공개 여행기에 사진 Lightbox와 긴 페이지용 DAY navigation을 한 번에 추가한다. 현재 사용자가 수동으로 조정한 사진/캡션/meal 데이터는 변경하지 않는다.

핵심 요구:
- 사진 클릭 확대, 좌우 이동, ESC/배경 클릭 닫기, 키보드 접근성, 모바일 대응
- 전체 페이지 기준 또는 같은 섹션 기준 사진 탐색
- DAY 1~4 + YADON 빠른 이동, 현재 구간 active 표시, smooth scroll, sticky/floating nav
- 기존 hero 상단 D1~D4 nav와 충돌하지 않게 정리
- reduced motion, body scroll lock, focus trap/restore 고려
- 현재 photo order/caption/layout/size/group/objectPosition/objectFit/meal 구조 보존
- basePath/static export/GitHub Pages 호환
- lint/build/test/static export 검증 후 origin/main push
