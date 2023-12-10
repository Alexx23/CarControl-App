//Alejandro Santamaria 

#include <SoftwareSerial.h>
#include <Servo.h>

int bluetoothTx = 2;
int bluetoothRx = 3;
int LEDBACKR = 13;
int LEDBACKL = 12;
int LEDFRONT = 11;

SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);

// Motor 1 - adelante y atras
int Motor1A = 5;
int Motor1B = 6;

//Motor 2 - derecha e iquierda
int Motor2A = 9;
int Motor2B = 10;

void setup()
{
  //Bluetooth a Android
  bluetooth.begin(115200);
  bluetooth.print("$$$");
  delay(100);
  bluetooth.println("U,9600,N");
  bluetooth.begin(9600);

  pinMode(LEDBACKR, OUTPUT);
  pinMode(LEDBACKL, OUTPUT);
  pinMode(LEDFRONT, OUTPUT);
  
  pinMode( Motor1A, OUTPUT );
  pinMode( Motor1B, OUTPUT );
  pinMode( Motor2A, OUTPUT );
  pinMode( Motor2B, OUTPUT );
  
  digitalWrite( Motor1A, HIGH );
  digitalWrite( Motor1B, HIGH );
  digitalWrite( Motor2A, LOW );
  digitalWrite( Motor2B, LOW );
}

int flag1 = -1;
int flag2 = -1;

void loop()
{
  //Bluetooth y da ordenes
  if(bluetooth.available())
  {
    char toSend = (char)bluetooth.read();
    if(toSend == '1')
    {
      digitalWrite(LEDFRONT,HIGH);
      }
         if(toSend == '2')
    {
      digitalWrite(LEDFRONT,LOW);
      }
    if(toSend == 'S')
    {
        digitalWrite(LEDBACKR,HIGH);
        digitalWrite(LEDBACKL,HIGH);
        
        flag1 = 0;
        flag2 = 0;
        digitalWrite( Motor1A, LOW );
        digitalWrite( Motor1B, LOW );
        //analogWrite( Motor1B, LOW );
        
        digitalWrite( Motor2A, LOW );
        analogWrite( Motor2B, LOW );
    }
    if(toSend == 'F' || toSend == 'G' || toSend == 'I')
    {
        digitalWrite(LEDBACKR,LOW);
        digitalWrite(LEDBACKL,LOW);
        if(flag1 != 1)
        { 
          flag1 = 1;
          digitalWrite( Motor1A, HIGH );
          analogWrite( Motor1B, 50 );
        }
    }
    if(toSend == 'L' || toSend == 'R')
    {
        digitalWrite(LEDBACKR,LOW);
        digitalWrite(LEDBACKL,LOW);
    }
    if(toSend == 'B' || toSend == 'H' || toSend == 'J')
    {
        digitalWrite(LEDBACKR,HIGH);
        digitalWrite(LEDBACKL,HIGH);
        if(flag1 != 2)
        { 
          flag1 = 2;
          digitalWrite( Motor1B, HIGH );
          analogWrite( Motor1A, 50 );
        }
    }

    if(toSend == 'L' || toSend == 'G' || toSend == 'H')
    {
        if(flag2 != 1)
        { 
          flag2 = 1;
          digitalWrite( Motor2B, HIGH );
          analogWrite( Motor2A, 50 );
        }
    }
    else
    if(toSend == 'R' || toSend == 'I' || toSend == 'J')
    {
        if(flag2 != 2)
        { 
          flag2 = 2;
          digitalWrite( Motor2A, HIGH );
          analogWrite( Motor2B, 50 );
        }
    }
    else
    {
        if(flag2 != 3)
        {
          flag2 = 3;
          digitalWrite( Motor2A, LOW );
          analogWrite( Motor2B, LOW );
        }
    }
  }
}
