#### 介绍

一个react-native练手项目，功能包括：查询图书信息， 查询读者信息， 备忘录   
由于没有相应api，所以通过koa请求数据，将返回的html解析成数据返回  

#### 开发背景
因为海南省图书馆网没有适配移动web页面，直接用手机浏览器访问该页面进行操作不太方便，正好在学习移动开发，所以决定使用rn开发一个用于查询图书和借阅信息的app  

#### 使用到的技术

1. React-Native
2. React-Navigation
3. React-Native-Elements
4. Redux + React-Redux
5. React-Native-fs (其内置一个备忘录功能，需要持久化数据，由于数据量不大，决定保存成json文件存在本地，读取到store中进行使用)