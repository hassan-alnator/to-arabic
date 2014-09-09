Arabic Numbers Recognition
==========================

Arabic Number recognition  Plugin using Jquery the reads any number and writes it in Arabic. 

Installation
==========================

Just Add the Follwoing into your `<head>` tag :
```
  <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="jquery-toarabic.min.js"></script>
  
```


How To Use
==========================
###Simple Impelementation

####Example 1 : Convert Numbers to Arabic in the Same Field.

#####Head
```
<script>
  $(document).ready(function(){
    $('#numbers').toarabic();
  });
</script>

```

#####Body:
```
<body>
  <input type="text" id="numbers"/>
</body>

```
