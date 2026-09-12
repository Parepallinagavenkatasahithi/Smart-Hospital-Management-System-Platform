import zipfile
import os

source_dir = 'c:\\Users\\Prasanth\\OneDrive\\Desktop\\mounika\\Smart_Hospital_Management_System'
output_filename = 'c:\\Users\\Prasanth\\OneDrive\\Desktop\\mounika\\Smart_Hospital_Management_System_Final.zip'

def zip_directory():
    print(f"Creating zip file at {output_filename}...")
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Explicitly exclude massive or generated directories that aren't source code
            dirs[:] = [d for d in dirs if d not in ('node_modules', 'venv', '__pycache__', '.vite', 'dist', 'coverage')]
            
            for file in files:
                file_path = os.path.join(root, file)
                # Calculate relative path to store in zip
                arcname = os.path.relpath(file_path, source_dir)
                zipf.write(file_path, arcname)
    print("Zip file successfully created.")

if __name__ == '__main__':
    zip_directory()
