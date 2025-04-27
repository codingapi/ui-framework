# UI-Framework

一个基于 React 和 TypeScript 构建的 UI 框架。

## 安装

```bash
npm install @codingapi/ui-framework
# 或者使用 yarn
yarn add @codingapi/ui-framework
```

## 使用

### 基本使用

```javascript
import { ComponentBus, EventBus } from '@codingapi/ui-framework';

// 初始化组件总线
const componentBus = new ComponentBus();

// 初始化事件总线
const eventBus = new EventBus();

// 注册组件
componentBus.register('MyComponent', {
  render: () => <div>Hello World</div>
});

// 使用组件
const MyComponent = componentBus.get('MyComponent');
```

### 事件总线使用

```javascript
// 订阅事件
eventBus.subscribe('eventName', (data) => {
  console.log('Received event:', data);
});

// 发布事件
eventBus.publish('eventName', { message: 'Hello' });
```

### 访问控制

```javascript
import { Access } from '@codingapi/ui-framework';

// 创建访问控制实例
const access = new Access();

// 设置权限
access.setPermission('user', ['read', 'write']);

// 检查权限
const hasPermission = access.checkPermission('user', 'read');
```

## Webpack 5 配置

如果你使用的是 Webpack 5，需要在你的 webpack 配置中添加以下配置：

```javascript
module.exports = {
  // ... 其他配置
  resolve: {
    fallback: {
      "util": false
    }
  }
};
```

## 主要特性

- 组件总线：用于管理和注册组件
- 事件总线：用于组件间通信
- 访问控制：用于权限管理
- TypeScript 支持：提供完整的类型定义
- 模块化：支持按需加载

## 开发

```bash
# 安装依赖
yarn install

# 构建
yarn build

# 发布
yarn push
```

## 许可证

Apache-2.0
