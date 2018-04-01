#### 介绍

一个react-native练手项目，开发背景是海南省图书馆没有web页面，手机查询不方便，所以决定学习rn开发一个用于查询图书和借阅信息的app  
由于没有相应api，所以通过koa请求数据，将返回的html解析成数据返回  
功能包括：查询图书信息， 查询读者信息， 备忘录

#### 使用到的技术

1. React-Native
2. React-Navigation
3. React-Native-Elements
4. Redux + React-Redux
5. React-Native-fs (其内置一个备忘录功能，需要持久化数据，由于数据量不大，决定保存成json文件存在本地，读取到store中进行使用)