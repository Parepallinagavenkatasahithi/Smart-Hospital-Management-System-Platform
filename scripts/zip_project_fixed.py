import zipfile
import os

source_dir = r'c:\Users\Prasanth\OneDrive\Desktop\mounika\Smart_Hospital_Management_System'
output_filename = r'c:\Users\Prasanth\OneDrive\Desktop\mounika\Smart_Hospital_Management_System_Final_Submission.zip'

print(f"Creating highly-compatible zip file at {output_filename}...")
with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(source_dir):
        # Exclude massive binaries and cache
        dirs[:] = [d for d in dirs if d not in ('node_modules', 'venv', '__pycache__', '.vite', 'dist', 'coverage')]
        
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, source_dir)
            
            # Read file metadata explicitly to set Linux-compatible permissions
            # This fixes the TrainPlex Bot (Linux) while maintaining Windows Zip compatibility
            zinfo = zipfile.ZipInfo.from_file(file_path, arcname)
            
            # 0o100644 maps to standard rw-r--r-- Unix permissions.
            zinfo.external_attr = 0o100644 << 16
            zinfo.compress_type = zipfile.ZIP_DEFLATED 
            
            with open(file_path, 'rb') as f:
                zipf.writestr(zinfo, f.read())

print("Zip file successfully created.")
