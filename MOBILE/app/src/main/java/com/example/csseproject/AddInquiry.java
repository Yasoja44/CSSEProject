package com.example.csseproject;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Html;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class AddInquiry extends AppCompatActivity {
    private String orderName,total,confirmation,delivery,status,supplierName,OrderId,supplierId;
    private TextView OName,tot,conf,deli,sta,suppName;
    private ImageView imageView;
    EditText editText;
    Button inquiry_button;
    String sEmail,sPassword,ToEmail,Subject;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_inquiry);


        OrderId = getIntent().getStringExtra("OrderId");
        orderName = getIntent().getStringExtra("OrderName");
        total = getIntent().getStringExtra("total");
        confirmation = getIntent().getStringExtra("confirmed");
        delivery = getIntent().getStringExtra("delivery");
        status = getIntent().getStringExtra("status");
        supplierName = getIntent().getStringExtra("supplierName");
        supplierId = getIntent().getStringExtra("supplierId");

        OName=findViewById(R.id.Order_name_in);
        tot=findViewById(R.id.Order_Total_in);
        conf=findViewById(R.id.Order_Confirm_in);
        deli=findViewById(R.id.Order_delivery_in);
        imageView=findViewById(R.id.Order_status_in);
        suppName=findViewById(R.id.supplier_name_in);

        if(status.equals("Approved")){
            imageView.setImageResource(R.drawable.green);
        }else if(status.equals("Decline")) {
            imageView.setImageResource(R.drawable.red);
        }else if(status.equals("Pending")) {
            imageView.setImageResource(R.drawable.orange);
        }
        if(delivery.equals("delivered") || delivery.equals("Delivered")){
            deli.setText("Delivered");
            deli.setTextColor(getResources().getColor(android.R.color.holo_green_dark));
        }else if(delivery.equals("not delivered")||delivery.equals("Not Delivered")) {
            deli.setText("Not Delivered");
            deli.setTextColor(getResources().getColor(android.R.color.holo_red_light));
        }
        OName.setText(orderName);
        tot.setText(total);
        conf.setText(confirmation);
        deli.setText(delivery);
        suppName.setText(supplierName);

        editText=findViewById(R.id.inquiry_message);
        inquiry_button=findViewById(R.id.inquiry_button);

        sEmail="hugoproducts119@gmail.com";
        sPassword="123hugo@12";
        ToEmail="pjk12755@gmail.com";
        Subject="Inquiry";



//        inquiry_button.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Properties props=new Properties();
//                props.setProperty("mail.transport.protocol", "smtp");
//                props.put("mail.smtp.auth", "true");
//                props.put("mail.smtp.port", "465");
//                props.put("mail.smtp.socketFactory.port", "465");
//                props.put("mail.smtp.socketFactory.class",
//                        "javax.net.ssl.SSLSocketFactory");
//                props.put("mail.smtp.socketFactory.fallback", "false");
//                props.setProperty("mail.smtp.quitwait", "false");;
//
//                Session session=Session.getInstance(props, new Authenticator() {
//                    @Override
//                    protected PasswordAuthentication getPasswordAuthentication() {
//                        return new PasswordAuthentication(sEmail,sPassword);
//                    }
//                });
//
//                try {
//                    Message message=new MimeMessage(session);
//
//                    message.setFrom(new InternetAddress(sEmail));
//
//                    message.setRecipients(Message.RecipientType.TO,
//                            InternetAddress.parse(ToEmail.trim()));
//
//                    message.setSubject(Subject.trim());
//
//                    message.setText(editText.getText().toString());
//
//                    new SendMail().execute(message);
//
//                } catch (MessagingException e) {
//                    e.printStackTrace();
//                }
//            }
//        });
//    }
//    private class SendMail extends AsyncTask<Message,String,String> {
//
//        private ProgressDialog progressDialog;
//
//        @Override
//        protected void onPreExecute() {
//            super.onPreExecute();
//            progressDialog=ProgressDialog.show(AddInquiry.this
//            ,"Please Wait","Sending Mail",true,false);
//        }
//
//        @Override
//        protected String doInBackground(Message... messages) {
//
//            try {
//                Transport.send(messages[0]);
//                return "Success";
//            } catch (MessagingException e) {
//                e.printStackTrace();
//                return "Error";
//            }
//        }
//
//        @Override
//        protected void onPostExecute(String s) {
//            super.onPostExecute(s);
//            progressDialog.dismiss();
//            if(s.equals("Success")){
//                AlertDialog.Builder builder=new AlertDialog.Builder(AddInquiry.this);
//                builder.setCancelable(false);
//                builder.setTitle(Html.fromHtml("<font color ='#509324'>Success</font>"));
//                builder.setMessage("Mail send Successfully");
//                builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
//                    @Override
//                    public void onClick(DialogInterface dialog, int which) {
//                        dialog.dismiss();
//                        editText.setText("");
//                    }
//                });
//
//                builder.show();
//            }else {
//                Toast.makeText(AddInquiry.this, "Something went Wrong ?", Toast.LENGTH_SHORT).show();
//            }
//        }
      }
      public void SendMail(View view){
          Intent intent=new Intent(Intent.ACTION_SENDTO);
          intent.setData(Uri.parse("mailto:"));
          intent.putExtra(Intent.EXTRA_EMAIL,sEmail);
          intent.putExtra(Intent.EXTRA_SUBJECT,Subject);
          intent.putExtra(Intent.EXTRA_TEXT,editText.getText().toString());

          startActivity(Intent.createChooser(intent,"Choose one applications"));

      }
}