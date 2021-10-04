package com.example.csseproject;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.csseproject.Model.Order;
import com.example.csseproject.ViewHolder.OrderIViewHolder;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QuerySnapshot;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class ViewItem extends AppCompatActivity {

    private TextView name,price,suppName,suppCompany,suppSpec,policy;
    private ImageView image;
    private String itemId,supplierId;
    private FirebaseFirestore firestore;
    private ImageView imageView;
    private LinearLayout mainLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_view_item);

        image=findViewById(R.id.item_view_Image);
        name=findViewById(R.id.item_view_name);
        price=findViewById(R.id.item_price_view);
        suppName=findViewById(R.id.Supplier_name_view);
        suppCompany=findViewById(R.id.Supplier_company_view);
        suppSpec=findViewById(R.id.Supplier_Speciality_view);
        policy=findViewById(R.id.Item_policy_view);
        imageView=findViewById(R.id.Image_policy);
        mainLayout=(LinearLayout)this.findViewById(R.id.ViewLayer3);


        itemId = getIntent().getStringExtra("itemId");
        supplierId = getIntent().getStringExtra("supplierId");

        firestore=FirebaseFirestore.getInstance();
            name.setText(itemId);
        firestore.collection("items").document(itemId).get()
                .addOnSuccessListener(new OnSuccessListener<DocumentSnapshot>() {
                    @Override
                    public void onSuccess(DocumentSnapshot documentSnapshot) {
                        if(documentSnapshot.exists()){
                            String Iname=documentSnapshot.getString("itemName");
                            String Iflag=documentSnapshot.getString("itemPolicyFlag");
                            String Iprice=documentSnapshot.getString("itemPrice");
                            String Iimage = documentSnapshot.getString("itemPic");

                            Picasso.get().load(Iimage).into(image);
                            name.setText(Iname);
                            price.setText(Iprice+"."+"00");
                            policy.setText(Iflag);
                            if(Iflag.equals("true")){
                                imageView.setImageResource(R.drawable.red);
                                policy.setText("Add Policy");
                                policy.setTextColor(getResources().getColor(android.R.color.holo_red_dark));
                            }else if(Iflag.equals("false")){
                                imageView.setVisibility(View.INVISIBLE);
                                mainLayout.setVisibility(LinearLayout.GONE);
                            }
                        }
                    }
                });
        firestore.collection("suppliers").document(supplierId).get()
                .addOnSuccessListener(new OnSuccessListener<DocumentSnapshot>() {
                    @Override
                    public void onSuccess(DocumentSnapshot documentSnapshot) {
                        if(documentSnapshot.exists()){

                            String ISname=documentSnapshot.getString("supplierName");
                            String ISCompany=documentSnapshot.getString("supplierCompany");
                            String ISpeciality=documentSnapshot.getString("supplierSpeciality");

                            suppName.setText(ISname);
                            suppCompany.setText(ISCompany);
                            suppSpec.setText(ISpeciality);
                        }
                    }
                });
    }
}