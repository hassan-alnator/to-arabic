Arabic Numbers Recognition
==========================

Arabic Number recognition  Plugin using Jquery that reads any number and writes it in Arabic. 

Installation
==========================

Just Add the Follwoing into your `<head>` tag :
```
  <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="jquery-toarabic.min.js"></script>
  
```


How To Use
==========================
#####Simple Impelementation

#####Example 1 : Convert Numbers to Arabic in the Same Field.

#####Head
```
<script>
  $(document).ready(function(){
    $('#numbers').toArabic();
  });
</script>

```

#####Body:
```
<body>
  <input type="text" id="numbers"/>
</body>

```


#####Example 2 : Convert Numbers to Arabic and append to another Field.

#####Head
```
<script>
  $(document).ready(function(){
    $('#numbers').toArabic({
        target:'#text'
    });
  });
</script>

```

#####Body:
```
<body>
  <input type="text" id="numbers"/>
  <input type="text" id="text"/>
</body>

```
