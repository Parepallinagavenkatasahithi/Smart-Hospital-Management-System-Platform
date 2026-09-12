import os
import zipfile

def create_zip():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    output_zip = os.path.join(root_dir, 'shms_project.zip')

    if os.path.exists(output_zip):
        try:
            os.remove(output_zip)
        except Exception as e:
            print(f"Notice: {e}")

    exclude_dirs = {'node_modules', 'dist', 'build', 'coverage', '.tmp', '__pycache__', '.venv', '.idea', '.vscode'}
    exclude_files = {'shms_project.zip', '.DS_Store', 'desktop.ini'}

    print("Creating clean TrainPlex submission zip archive (including .git, excluding node_modules)...")

    count = 0
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(root_dir):
            # Exclude unwanted directories
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                if file in exclude_files or file.endswith('.pyc') or file.endswith('.tsbuildinfo'):
                    continue
                
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, root_dir)
                zipf.write(full_path, rel_path)
                count += 1

    file_size_mb = os.path.getsize(output_zip) / (1024 * 1024)
    print(f"Successfully created {output_zip}")
    print(f"Total files archived: {count}")
    print(f"Zip archive size: {file_size_mb:.2f} MB")

if __name__ == '__main__':
    create_zip()
