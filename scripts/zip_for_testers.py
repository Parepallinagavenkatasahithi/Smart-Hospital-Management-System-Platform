import zipfile
import os

source_dir = r'c:\Users\Prasanth\OneDrive\Desktop\mounika\Smart_Hospital_Management_System'
output_filename = r'c:\Users\Prasanth\OneDrive\Desktop\mounika\Smart_Hospital_Management_System_For_Testers.zip'

print(f"Creating Windows-friendly zip file at {output_filename}...")
with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(source_dir):
        dirs[:] = [d for d in dirs if d not in ('node_modules', 'venv', '__pycache__', '.vite', 'dist', 'coverage')]
        
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, source_dir)
            
            # Use native write() to avoid injecting Unix permissions that confuse Windows Explorer
            zipf.write(file_path, arcname)

print("Zip file successfully created.")
