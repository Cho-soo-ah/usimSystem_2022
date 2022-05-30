# Usim System

---

<aside>
💡 리뉴얼 방향 : 기존의 기능들을 구체화시키고 편리한 ux를 위한 방향으로 개선

</aside>

- 사용기술
    - Spring Boot
    - MS SQL
    - React / Next.js
    - MUI
    - recoil
    - axios
    - formik, yup
    - react datepicker

---

### 기능

- 메인 페이지
    - 가장 많이 사용하는 퀵메뉴로 구성
- 로그인/회원가입 페이지
    - 유효성 검사
- 마이페이지
    - 내정보 : 회원가입 시 입력한 계정 정보를 보여주고 수정, 저장
    - 내유심리스트 : 로그인 한 계정에 등록된 유심 리스트
    - 대리점 정보 : 로그인 한 계정에 등록된 대리점 정보 리스트
- 예치금 내역
    - 고객이 입금했던 예치금 내역 리스트 페이지
    - 엑셀 파일로 다운로드 버튼
    - 검색필터 : 바코드/서비스 번호, 날짜, 대리점명, 사유
- 개통 및 충전 처리
    - 새로운 유심 개통 처리 페이지
    - 유효성 검사
    - 드래그 앤 드랍으로 이미지 업로드
- 개통 및 충전 내역
    - 개통된 유심 내역 리스트
    - 검색필터 : 바코드/서비스 번호, 날짜, 대리점명, 상품명, RIS 상태
- 대리점 개통 및 충전 현황
    - 등록된 대리점 내역 리스트
    - 검색필터 : 바코드/서비스 번호, 날짜, 대리점명, 상품명, RIS 상태
- 입금 내역
    - 입금 전체내역 리스트
    - 엑셀 파일로 다운로드 버튼
    - 검색필터 : 날짜, 대리점명, 입금자명
- 유심 관리
    - 등록된 유심 리스트
    - 클릭, 컨트롤 + 클릭, 쉬프트 + 클릭 기능
    - 엑셀 파일로 업로드 버튼
    - 엑셀 파일로 다운로드 버튼
    - 검색필터 : 바코드/서비스 번호, 대리점명, 유심 번호
    - 유심 수정 페이지 : 등록된 유심 정보 수정, 저장 기능
    - 유심 등록 페이지 : 유심 개별 업로드 기능, 유효성 검사
- 상품 관리
    - 유심 정보 상세 리스트
    - 상품 수정 페이지 : 등록된 상품 정보 수정, 저장 기능
    - 상품 등록 페이지 : 상품 개별 업로드 기능, 유효성 검사
- 회원 관리
    - 가입한 회원 리스트
    - 엑셀 파일로 다운로드 버튼
    - 검색필터 : 바코드/서비스 번호, 대리점명, 유심 번호
    - 회원 수정 페이지 : 등록된 회원 정보 수정, 저장 기능
    - 회원 등록 페이지 : 회원 개별 업로드 기능, 유효성 검사(관리자 권한에 따른 대리점 선택)
- 대리점 관리
    - 등록된 대리점 상세 리스트
    - 대리점 수정 페이지 : 등록된 대리점 정보 수정, 저장 기능
    - 대리점 등록 페이지 : 대리점 개별 업로드 기능, 유효성 검사

---

### 화면 구현

- 마이페이지

![마이페이지_유효성 검사](https://user-images.githubusercontent.com/83620662/170926518-b0a17d45-4b69-4d82-9954-8dab19e8189e.PNG)


- 개통 및 충전 처리
    
![개통및충전처리_유효성검사_이미지드랍앤업로드](https://user-images.githubusercontent.com/83620662/170926541-5a3bdb24-52dc-4443-8f10-841d14834331.PNG)

    

- 내 유심리스트
    
![내유심리스트](https://user-images.githubusercontent.com/83620662/170926435-7628c1b7-9c95-43cf-aed2-56ffd7bc7c13.PNG)


    
- 테이블 선택
    
    
![내유심리스트_테이블선택](https://user-images.githubusercontent.com/83620662/170926634-7aa8978d-4147-4198-8175-8508aaf4f4ef.PNG)

    

- 유심 관리
    
    ![유심관리](https://user-images.githubusercontent.com/83620662/170926454-8262a833-0c83-413e-af3b-e8d5c842b2dd.PNG)

    
    - 검색필터
    
    ![검색화면](https://user-images.githubusercontent.com/83620662/170926466-6f18d48b-13cc-47e3-8a62-0595d8ba5751.PNG)

    

- 회원 등록

![17_회원등록](https://user-images.githubusercontent.com/83620662/170926584-36c8c6b8-3518-4ca0-92f9-b984c771ca91.png)

