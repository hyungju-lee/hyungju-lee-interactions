## HJ's Interaction

### Scroll interaction 1

* [스크롤 인터렉션 첫번째 - Pure JavaScript](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-1/index-javascript.html)  
  
  * 사용 기법 : requestAnimationFrame API를 활용한 부드러운 감속 스크롤
  * 테스트 브라우저 : Window Chrome, FF, IE 11 / Mac Chrome, Safari / 아이폰X Safari
  * 테스트 기기 : 매직마우스, 트랙패드, 윈도마우스휠, 아이폰X
  * 결과  
    - 트랙패드  
        1. window chrome, FF 의도한대로 작동 잘된다.
        2. window IE 11 작동은 잘 되는데 스크롤 동작이 끝나면 화면 깜빡임 현상이 있다. (스크롤 동작 끝날 때 발생하는 overflow : hidden <-> auto 전환 때문인 것 같다.)
        3. Mac chrome, Safari 관성스크롤에 의해 살짝 넘어갈 때도 있고 안넘어갈 때도 있다. 넘어가더라도 아주 살짝 넘어간다.
    
    - window 마우스휠
        1. window, chrome, FF 의도한대로 작동 잘된다.
        2. window IE 11 트랙패드와 동일하다.
    
    - Mac 매직마우스
        1. Mac chrome, Safari 관성스크롤에 의해 살짝 넘어갈 때도 있고 안넘어갈 때도 있다. 넘어가더라도 아주 살짝 넘어간다.
    
    - 아이폰X safari
        1. 의도한대로 작동 잘된다.
        
* [스크롤 인터렉션 첫번째 - jQuery](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-1/index-jquery.html)
  
  * 사용 기법 : 제이쿼리 animate 메서드 활용
  * 테스트 브라우저 : Window Chrome, FF, IE 11 / Mac Chrome, Safari / 아이폰X Safari
  * 테스트 기기 : 매직마우스, 트랙패드, 윈도마우스휠, 아이폰X
  * 결과
    - 트랙패드  
        1. window chrome, FF 관성 스크롤에 의해 다음 섹션으로 한참 벗어난다.
        2. window IE 11 : 오히려 신기한게 관성스크롤이 있음에도 IE 11에선 딱딱 잘 멈춘다. 깜빡거리는 현상도 당연히 없고 훨씬 자연스럽게 잘 작동한다.
        3. Mac chrome, Safari 관성스크롤에 의해 다음 섹션으로 한참 벗어난다.
    
    - window 마우스휠
        1. window, chrome, FF, IE11 의도한대로 작동 잘된다.
    
    - Mac 매직마우스
        1. Mac chrome, Safari 관성스크롤에 의해 다음 섹션으로 한참 벗어난다.
    
    - 아이폰X safari
        1. 의도한대로 작동 잘된다.
        
* **총평**  
    - **주의** : jQuery로는 안되는데 JavaScript로는 된다던지 그 반대라던지라는 개념이 아니다. **사용한 기법에 포커스를 둬야된다.**
    - 트랙패드와 매직마우스를 지원 안할 거면 jQuery 페이지에 사용한 기법이 낫다.
    - 트랙패드와 매직마우스를 포함한 대부분의 기기를 고려할거라면 JavaScript 페이지 기법이 더 낫다.

### Scroll interaction 2
    
* [스크롤 canvas 인터렉션 (만드는 중)](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-2/index-javascript.html)

  * **구현 예정**
  1. 스크롤 위치에 따른 현재 애니메이션 섹션 인식
  2. 현재 애니메이션 섹션의 canvas 태그 display: block 처리
  3. 아닌 canvas 태그는 display: none 처리
  4. requestAnimationFrame 처리 (Mac에서 윈도우 마우스 휠 / 키보드로도 부드러운 애니메이션 구현 가능)
  5. ...