function encrypt() {
  var input=docuent.getElementById("msg_source");
  var pwd=document.getElementById("pwd");
  var final=document.getElementById("encrypt_result");

//string to bin
function str2bin(str){
    res = "";
    str=String(str);
    for (var i=0;i<str.length;i++)
    {
      var temp=str[i];
      var bin=temp.charCodeAt().toString(2);
      bin="0"+bin;
      res+=bin;
      if (i<str.length-1){
        res+=" ";
      }
    }
    return res;
  }

//bin to string
function bin2str(bin){
  var res="";
  var ls=bin.split(" ");
  for (var i=0;i<ls.length;i++){
    var temp=ls[i];
    if (temp!=" "){
    res+=String.fromCharCode(parseInt(Number(temp),2));
  }
  }
  return res;
}

//bin to dna
function bin2dna(bin) {
  var dna_bin = new Map([["00","A"],["01","C"],["10","G"],["11","T"]]);
  var index=0;
  var dna_str="";
  while(index<bin.length){
    if (bin[index]!=" "){
      dna_str+=dna_bin.get(String(bin.substring(index,index+2)));
      index+=2;
    }
    else{
      dna_str+=" ";
      index+=1;
    }
  }
  return dna_str;
}

//dna to bin
function dna2bin(dna) {
  var bin_dna = new Map([["A","00"],["C","01"],["G","10"],["T","11"]]);
  var index=0;
  var bin_str="";
  while(index<dna.length){
    if (dna[index]!=" "){
      bin_str+=bin_dna.get(dna[index]);
    }
    else {
      bin_str+=" "
    }
    index+=1;
  }
  return bin_str;
}

//gengrate parameter for chaos matrix
function random_parameter(key,dim) {
  key=String(key);
  res="";
  for (var i=0;i<key.length;i++)
  {
    var temp=key[i];
    var bin=temp.charCodeAt().toString(2);
    bin="0"+bin;
    res+=bin;}
    key=parseInt(Number(res),2);
    var seed = Number(key);
    seed = (seed * 9301 + 49297) % 233280;
    var x_0 = seed / 233280.0;
    var seed = Number(3.1415926*key);
    seed = (seed * 9301 + 49297) % 233280;
    var r = seed *4 / 233280.0;
    return [r,x_0];   // Math.ceil实现取整功能，可以根据需要取消取整
 }

//generate random dna string
function gen_random_dna_str(key,len) {
  var new_dna="";
  var r =key[0];
  var x_i=key[1];
  for (var i=0;i<len;i++){
    x_i = r * x_i * (1 - x_i);
    xi_str = String(x_i);
    if (xi_str.length>12)
    {
      var temp=xi_str[10];
        if (temp>"5"){
          new_dna+="1";
      }
        else{
        new_dna+="0"
      }
      }
    else{
          new_dna+="0";
        }
    }
  new_dna=bin2dna(new_dna);
  return new_dna;
}

//dna and
function dna_and(s1,s2) {
  var res="";
  if ((s1 === "T" && s2 === "T") || (s2 === "T" && s1 === "T"))
      {res = "C";}
  else if ((s1 === "T" && s2 === "A") || (s2 === "T" && s1 === "A"))
      {res = "G";}
  else if ((s1 === "T" && s2 === "C") || (s2 === "T" && s1 === "C"))
      {res = "T";}
  else if ((s1 === "T" && s2 === "G") || (s2 === "T" && s1 === "G"))
      {res = "A";}
  else if ((s1 === "A" && s2 === "A") || (s2 === "A" && s1 === "A"))
      {res = "C";}
  else if ((s1 === "C" && s2 === "A") || (s2 === "C" && s1 === "A"))
      {res = "A";}
  else if ((s1 === "G" && s2 === "A") || (s2 === "G" && s1 === "A"))
      {res = "T";}
  else if ((s1 === "C" && s2 === "C") || (s2 === "C" && s1 === "C"))
      {res = "C";}
  else if ((s1 === "G" && s2 === "C") || (s2 === "G" && s1 === "C"))
      {res = "G";}
  else
      {res = "C";}
  return res;
}

//dna complement
function dna_complement(s) {
  res = "";
  if (s === "A")
    {res = "T";}
  else if (s === "T")
    {res = "A";}
  else if (s === "C")
    {res = "G";}
  else
    {res = "C";}
  return res;
}

//no key and gengrate Key
function gen_random_key() {
  var rnd=Math.random()*1000000;
  return Math.ceil(rnd);
}

//main function
if (pwd === null)
{
  pwd=gen_random_key();
  alert("No key input and get a random key "+String(wd));
}
var str_bin = str2bin(input);
var dna_str = bin2dna(str_bin);
var key_ = random_parameter(pwd, 1);
var random_dna_str = gen_random_dna_str(key_, dna_str.length * 2);
var and_dna = "";
for (var i=0;i<dna_str.length;i++){
  and_dna += dna_and(dna_str[i], random_dna_str[i]);
}
var complement_dna = "";
for (var i=0;i<and_dna.length;i++){
    complement_dna += dna_complement(and_dna[i]);
}
final.value=complement_dna;
}
