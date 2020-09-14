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

  * **사용기법**
  1. canvas 태그 활용 : 성능을 끌어올리기위함
  2. requestAnimationFrame 메서드의 재귀적 활용 (가속도 스크롤) : 보다 부드러운 애니메이션 구현가능, 맥에서 윈도우마우스휠, 키보드로 스크롤을 움직여도 애니메이션이 부드러움
  3. keyframe 개념활용 애니메이션 구현 : CSS Keyframe 개념과 같음
  
  * **지원범위**
  1. 윈도우 : 크롬 / FF / IE11 / IE10
  2. 맥 : 사파리 / 크롬
  3. 윈도우 : 마우스휠 / 키보드 / 트랙패드
  4. 맥 : 매직마우스 / 키보드 / 마우스휠 / 트랙패드
  5. 모바일 및 테블릿 그리고 아이패드
  
  NC 때 해결하지 못했던 맥에서 윈도우 마우스휠, 키보드시 딱딱 끊어지면서 스크롤 인터렉션이 발생하던 이슈를 해결
  
### canvas interaction

* [1.1 canvas 기본형태](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex01/index-1.html)
* [1.2 canvas 드로잉 표면에 대한 크기 / 요소 자체에 대한 크기](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex02/index-2.html)
* [1.3 canvas 아날로그 시계구현](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex03/index-3.html)
* [1.4 canvas 좌표구하기 - mousemove 이벤트 활용](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex04/index-4.html)
* [1.5 이론 : canvas 키보드이벤트 활용](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex05/index-5.html)
* [1.6 이론 : canvas 드로잉 표면의 저장 및 복원](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex06/index-6.html)
* [1.7 이론 : canvas에서 HTML 요소 사용하기](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex07/index-7.html)
* [1.8 보이지 않는 HTML 요소](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex08/index-8.html)
* [1.9 캔버스 이미지로 출력하기](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex09/index-9.html)
* [1.10 오프스크린 캔버스](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex10/index-10.html)
* [1.11 이론 : 간단한 수학 입문](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex11/index-11.html)
* [1.12 이론 : 결론](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex12/index-12.html)

* [2. 드로잉](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex13/index-13.html)
* [2.1 좌표계](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex14/index-14.html)
* [2.2 드로잉 모델](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex15/index-15.html)
* [2.3 직사각형 그리기](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex16/index-16.html)
* [2.4 색상과 투명도](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex17/index-17.html)