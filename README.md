# vue-error
Vue libruary for managment error handling

### Examples

```javascript
throw new ClientException("Error message");

// in vue-component
throw this.$exception("Warning message", ClientExceptionType.Warning);

try{
...
}
catch(error)
  // save error-stack
  throw new ClientException(error);
}
```

### Overlay component

```javascript
async created(){
    try {
        // load data
        await this.load()
    } catch (e) {
        // overlay this component by error-overlay component
        this.$exception(e).toComponent(this, this.refresh);
    }
}
methods: {
    // Action on reloading this component
    refresh() {
        // some logic here
    }
}
```

### Api

<table>
    <th>Method</th>
    <th>Type</th>
    <th>Description</th>
    <tr>
        <td>toConsole</td>
        <td>Function():void</td>
        <td>Write error message to console</td>
    </tr>
    <tr>
        <td>notify</td>
        <td>Function():void</td>
        <td>show ui notification. Remark: 'Vue.prototype.$notify' initialization required</td>
    </tr>
    <tr>
        <td>toComponent</td>
        <td>Function(component:Vue, callback:Function):void</td>
        <td>Show info over the top component.Dynamicaly create ErrorOverlayComponent. If `callback` is not null, show refresh-button</td>
    </tr>
</table>