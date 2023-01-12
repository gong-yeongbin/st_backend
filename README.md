- - -
#### TYPESCRIPT
* install   
npm install typescript --save-dev 타입스크립트.  
npm install @types/node --save-dev node.d.ts.  
npx tsc --init 타입스크립트 옵션 tsconfig.json.  
npm install ts-node --save-dev 타입스크립트 코드가 컴파일 되기를 기다리지 않고 바로 타입스크립트 코드를 실행.  
npm install nodemon --save-dev nodemon 파일에 수정/추가와 같은 변화가 생기면 자동으로 재시작.  
npm install --save-dev rimraf 예전에 생성된 build 폴더 삭제.  
- - -
- - -
#### ESLint
* install   
npm install -D eslint.  
npx eslint --init .eslint.json 파일 생성 및 설정   

아래와 같이 물어보면 해당하는 답변 선택
+ How would you like to use ESLint?   
+ What type of modules does your project use?   
+ Which framework does your project use?   
+ Does your project use TypeScript? (y/N)   
+ Where does your code run? (Press space to select, a to toggle all, i to invert selection)   
+ What format do you want your config file to be in? (Use arrow keys)   
+ The config that you've selected requires the following dependencies:
+ @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
+ Would you like to install them now with npm? (Y/n)   

설치 완료 후 .eslintrc.json 파일 생성되고 설정 추가

    {
      ...
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": 2018,
        "sourceType": "module"
      },
      "ignorePatterns": ["dist/", "node_modules/"]
      ...
    }   
__extends__ 는 ESLint에 적용할 규칙들을 정의해주는 곳 나중에 정의된 옵션일수록 높은 우선 순위   
__parserOptions.project__ 는 타입 정보를 필요로 하는 규칙들을 사용하고 싶으면 설정해야 하는 속성,프로젝트의 tsconfig.json 파일의 위치를 적어줌.   
__ignorePatterns__ 는 ESLint가 무시할 폴더, 파일을 적어주는 옵션
- - -
- - -
#### Prettier
* install.  
npm i -D prettier.  
npm i -D eslint-config-prettier eslint-plugin-prettier ESlint 호환   

__eslint-config-prettier__ 는 Prettier와 충돌되는 ESLint 규칙들을 무시하는 설정.  
__eslint-plugin-prettier__ 는 Prettier를 사용해 포맷팅을 하도록 ESLint 규칙을 추가하는 플러그인.  

.prettierrc.json 직접 파일생성 후 필요에 따라 다음과 같은 옵션 적용   

      {
        "printWidth": 80,			// 한 줄의 라인 수
        "tabWidth": 2,			// tab의 너비
        "useTabs": false,			// tab 사용 여부
        "semi": true,				// ; 사용 여부
        "singleQuote": true,			// 'string' 사용 여부
        "quoteProps": "consistent",		// 객체 property의 따옴표 여부
        "trailingComma": "es5",		// 끝에 , 사용 여부
        "bracketSpacing": true,		// Object literal에 띄어쓰기 사용 여부 (ex: { foo: bar })
        "arrowParens": "always",		// 함수에서 인자에 괄호 사용 여부 (ex: (x) => y)
        "endOfLine": "lf"			// 라인 엔딩 지정
      }   

.eslintrc.json 파일에 prettier 설정 추가   

    {
      ...
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint" // 이렇게 적용하면 eslint에러 --> "prettier" 변경됨
      ],
      ...
    }

- - -
