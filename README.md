## HJ's Interaction

### Scroll interaction 1

* [추가 인터렉션 참고 - 애플 사이트 스트로크 그리기 효과](https://hyungju-lee.github.io/hyungju-lee-interactions/apple-stroke/)
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
  
### Scroll interaction 3

* [예시파일](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-3/bbc-covid19-interaction/)
* [선행학습 data-*](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-3/ex-study01.html)
* [선행학습 HTMLElement.dataset](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-3/ex-study02.html)
* [선행학습 Using data attributes](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-3/ex-study03.html)
* [상세 내용은 여길 참고](https://hyungju-lee.github.io/category/js_bbc_interaction)
  
### interactive web study

* [mousemove 값활용](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample.html)
* [requistAnimationFrame (loop, 자연스러운 움직임)](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample2.html)
* [transform, translate 값 변경](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample3.html)
* [transition, easing (가속도)](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample4.html)
* [예제 사이트 1 분석 - 픽스낫띵(FIX NOTHING) / 핵심기능 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_3_1.html)
* [예제 사이트 2 분석 - 뉴욕타임스 allbirds / 핵심 기능 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample6.html)
* [blend-mode, multiply, 스크립트 설명](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample7.html)
* [스크롤 높이 값 구하기 (scrollTop)](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample8.html)
* [가로진행바 제작 (스크롤 백분율 구하기)](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample9.html)
* [세로진행바로 변경](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample10.html)
* [html 페럴렉스 제작 준비 (더미 컨텐츠 채우기)](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample11.html)
* [브런치 스타일. scale, opacity 페럴렉스 페이지 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample12.html)
* [입체감이 느껴지는 페럴렉스 페이지 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/lastSample/)
* [인터랙티브 교차 페이징](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/paging/)

### interaction web study 2

#### 1
* [이동할 거리 백분율 구하는 방법](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section2/step1/)
* [무한스크롤링](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section2/step2/)


#### 2
* [트랜지션과 트랜스포에 대한 이해 및 벤더프리픽스](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section3/step1/)
* [CSS 애니메이션과 키프레임에 대한 이해](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section3/step2/)
* [애니메이션 가속도를 처리하는 방법](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section3/step3/)

#### 3
* [간단한 애니메이션 모션그래픽 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section4/step1/)
* [스크롤위치에 따라 아침, 오후, 저녁, 밤 그리고 달 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section4/step2/)
* [스크롤 인터렉션 스크립트 작성하기, 패럴렉스 + 배경전환](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section4/step3/)
* [모바일 처리 및 최종 결과물 확인하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section4/step4/)

#### 4
* [인터렉션에 적용할 마크업과 css 구현하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section5/step1/)
* [섹션이동 스크롤 인터렉션 스크립트 작성](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section5/step2/)
* [다중 페럴렉스 스크립트 작성하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section5/step3/)

#### 5
* [텍스트 마스크 효과 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step1/)
* [오늘 날짜 카운트 스크립트 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step2/)
* [이미지 마스크 효과 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step3/)
* [텍스트 오버랩 효과 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step4/)
* [배경 오버랩 효과 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step5/)
* [스크롤이 요소의 위치에 도달했을 때 실행될 스크립트 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step6/)
* [URL HASH를 활용해 네비게시연 리모컨 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step7/)
* [최종 브라우저 테스트 - 버그 수정](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step8/)

#### 6
* [컨텐츠 고정하는 css와 html 작성](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section7/step1/)
* [고정한 컨텐츠에 적용될 스크립트 작성하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section7/step2/)
* [반응형 모바일버전 작성하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section7/step3/)
* [최종 브라우저 테스트, 그리고 모더나이저.js 사용법 학습 -인터넷 익스플로러 대응](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section7/step4/)

#### 7
* [컨텐츠 고정하는 css와 html 작성](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section8/step1/)
* [스크롤에 반응하는 이미지 슬라이드와 텍스트 처리 스크립트 작성하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section8/step2/)
* [반응형 모바일버전 작성하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section8/step3/)
* [최종 브라우저 테스트 - 인터넷 익스플로러 대응](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section8/step4/)

#### 8 
* [html, css 작성하기 - 모바일 포함](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section9/step1/)
* [이미지 시퀀스를 활용한 캔버스 스크립트 작성하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section9/step2/)
* [최종 브라우저 테스트 - 인터넷 익스플로러 대응](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section9/step3/)

#### 9
* [스크롤 UI 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step1/)
* [CSS 3D 모델 만들기1](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step2/cube.html)
* [CSS 3D 모델 만들기2](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step2/)
* [3D 모델에 사물입히기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step3/)
* [UI섹션과 3D 모델 이미지 매치 시키기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step4/)
* [원근감 조절](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step2/index2.html)
* [도전과제 - 단 한번 실행되어야할 함수와 계속 실행되어야할 함수 분리](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step5/)
* [도전과제 - 천천히 등장하는 배경색 구현, 섹션에 도착시 3D 모델이 회전하도록 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step6/)

#### Bonus
* [canvas circle draw](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/bonus_ui/interactive_coding_public/interactive_canvas_circle_draw/)
* [image tab](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/bonus_ui/interactive_coding_public/interactive_imgtab/)
* [modal](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/bonus_ui/interactive_coding_public/interactive_modal/)
* [modal2 - only javascript](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/bonus_ui/interactive_coding_public/interactive_modal/index2.html)
  
    * 상하단 인디케이터바 없는 상태에서 safe-area-inset-bottom 영역에 터치무브하면 body가 스크롤되긴한다.. 이 부분은 해결 못햇으나 그래도 많이 해결했다.

* [panorama](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/bonus_ui/interactive_coding_public/interactive_panorama/)

#### 10
* [svg와 영상을 활용한 인터렉션](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section11/step1/)
* [svg와 영상을 활용한 인터렉션2](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section11/step2/)
* [svg 활용 인터렉션](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-4/)

### layer popup

* [연속적으로 생기는 토스트팝업](https://hyungju-lee.github.io/hyungju-lee-interactions/layer-popup/toast-popup.html)

### validator

* [input 유효성검사](https://hyungju-lee.github.io/hyungju-lee-interactions/validator/validator.html)
  
### button 눌렀을 때 스크롤 휭휭 움직이기 (가속도 - 증가 감속)

* [버튼 눌렀을 때 스크롤 휭휭 가속도(증가 감속)](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-5/tap-event.html)
    
    * 코드정리 아직 안함
    * 스크롤 이동
    * 증가 가속도 및 감소 가속도 처리
    
* [버튼 눌렀을 때 캔버스 무한 스크롤링 휭휭 가속도(증가 감속)](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-5/tap-event2.html)

    * 코드정리 아직 안함
    * 이미지 불러오고 가상 canvas에 그리고 이미지 데이터 추출해 html상 canvas에 그리기 getImageData / putImageData
    * 증가 가속도 및 감소 가속도 처리
    * 반올림 처리도 해야됨
    
* [위에꺼 약간 코드정리?](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-5/tap-event3.html)
* [위에꺼 약간 코드정리? - IE10 까지 되도록 바벨돌린 버전](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-5/tap-event3-ie10.html)

    * 세미콜론(;) 주의하자!! 항상 세미콜론 찍는 습관들여!!!!!!!!!!!!!!!!!!!!!
    * 아 그리고 파랑 반투명막 이건 탭하이라이트 칼라였음 - 이거 투명색으로 지정!! 모바일에서 안보이게~!
    * **로컬서버에선 괜찮은데** git 같은 서버에 올리면 IE에서 새로고침시 image의 naturalWidth 값을 못불러온다. 왜그러지?
    * 여튼 일단 `setTimeout` 사용... IE10까지는 지원.. 찝찝한 해결방법이긴한데, `setTimeout` 말곤 방법을 모르겠다.  
      IE 자바스크립트 엔진 돌아가는거에 대한 이해도가 있어야 해결 가능할것같다.
    
---

getImageData() 메소드는 로컬 서버에서만 제대로 작동하는 메소드인 것 같다.  
대체품..있으려나?  
그런데 서버에서 되면 괜찮긴하지 뭐 음..

* [CORS 제한 이슈 - 로컬서버에서 실행하는 수밖엔 없음](https://stackoverflow.com/questions/45444097/the-canvas-has-been-tainted-by-cross-origin-data-local-image)
* [CORS 제한 이슈 - 로컬서버에서 실행하는 수밖엔 없음 - 번역](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-5/tap-event4.html)
* [CORS 제한 이슈 - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)

---
  
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
* [2.5 그라디언트와 패턴 - 선형 그라디언트](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex18/index-18.html)
* [2.5.1.2 방사형 그라디언트](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex19/index-19.html)
* [2.5.2 패턴](https://hyungju-lee.github.io/hyungju-lee-interactions/canvas-interaction/ex20/index-20.html)