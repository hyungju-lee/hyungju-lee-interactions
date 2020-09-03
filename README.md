## HJ's Interaction

### Pure JavaScript

* [스크롤 인터렉션 첫번째 - 거의 완벽!](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-1/index-javascript.html)  
  
  * 테스트 브라우저 : Window Chrome, FF, IE 11 / Mac Chrome, Safari / 아이폰X Safari
  * 테스트 기기 : 매직마우스, 트랙패드, 윈도마우스휠, 아이폰X
  * 결과 : 대부분의 기기에서 아주 잘됨.  
    Mac 트랙패드가 약간 민감.  
    Mac 트랙패드에서 스크롤을 연달아 엄청 쎄게하면 살짝 두번째 섹션을 벗어남.  
    하지만 사용자가 그렇게 이상하게 스크롤을 하진 않을 테니 큰 이슈는 아닐듯
    
* 스크롤 canvas 인터렉션 (만들 예정~!)

  1. 스크롤 위치에 따른 현재 애니메이션 섹션 인식
  2. 현재 애니메이션 섹션의 canvas 태그 display: block 처리
  3. 아닌 canvas 태그는 display: none 처리

### jQuery

* [스크롤 인터렉션 첫번째 - 아직 미완성!](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-1/index-jquery.html)
  
  * 테스트 브라우저 : 윈도우 Chrome, FF, IE 11
  * 테스트 기기 : 윈도마우스휠
  * 결과 : 테스트 기기 브라우저에선 잘됨  
    하지만 민감한 기기(트랙패드, 매직마우스, 모바일)에선 연달아 스크롤을 작동시키면 다음 섹션을 확 벗어날 것으로 예상됨
