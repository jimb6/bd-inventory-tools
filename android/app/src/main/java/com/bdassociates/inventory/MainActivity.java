package com.bdassociates.inventory;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Toast;
import androidx.appcompat.app.ActionBar;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Configure the action bar
        setupActionBar();
    }
    
    private void setupActionBar() {
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            // Set custom title
            actionBar.setTitle("BD & Associates Inventory");
            actionBar.setSubtitle("Inventory Manager");
            
            // Show the action bar
            actionBar.show();
            
            // Enable elevation for material design
            actionBar.setElevation(4f);
        }
    }
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar
        getMenuInflater().inflate(R.menu.main_menu, menu);
        return true;
    }
    
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int itemId = item.getItemId();
        
        if (itemId == R.id.action_refresh) {
            // Handle refresh action
            refreshApp();
            return true;
        } else if (itemId == R.id.action_settings) {
            // Handle settings action
            showSettings();
            return true;
        } else if (itemId == R.id.action_about) {
            // Handle about action
            showAbout();
            return true;
        }
        
        return super.onOptionsItemSelected(item);
    }
    
    private void refreshApp() {
        // Reload the web app
        if (getBridge() != null && getBridge().getWebView() != null) {
            getBridge().getWebView().reload();
        }
        Toast.makeText(this, "Refreshing inventory data...", Toast.LENGTH_SHORT).show();
    }
    
    private void showSettings() {
        Toast.makeText(this, "Settings coming soon...", Toast.LENGTH_SHORT).show();
    }
    
    private void showAbout() {
        Toast.makeText(this, "BD & Associates Inventory Manager v1.0", Toast.LENGTH_LONG).show();
    }
}
