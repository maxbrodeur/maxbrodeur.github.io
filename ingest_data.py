#!/usr/bin/env python3
"""
General-purpose data ingestion script for gallery data.

This script scans directories and generates JSON data files for various galleries:
- Photography gallery: organizes photos by location with captions and dates
- Fractal gallery: organizes fractals by generation method

Usage:
    python3 ingest_data.py --gallery fractal
    python3 ingest_data.py --gallery photography
    python3 ingest_data.py --all
"""

import os
import json
import argparse
from pathlib import Path
from typing import List, Dict, Any


class GalleryDataGenerator:
    """Base class for gallery data generation."""
    
    def __init__(self, base_dir: str):
        self.base_dir = Path(base_dir)
    
    def generate(self) -> List[Dict[str, Any]]:
        """Generate gallery data. To be implemented by subclasses."""
        raise NotImplementedError
    
    def save(self, output_file: str):
        """Generate and save data to JSON file."""
        data = self.generate()
        output_path = self.base_dir / output_file
        
        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"✓ Generated {output_path}")
        print(f"  Total items: {len(data)}")
        return data


class FractalGalleryGenerator(GalleryDataGenerator):
    """Generate data for fractal gallery organized by generation method."""
    
    def __init__(self, base_dir: str = "fractal_gallery"):
        super().__init__(base_dir)
        self.images_dir = self.base_dir / "images"
        
        # Method descriptions for the gallery
        self.method_descriptions = {
            "poly": "Polynomial iterative maps create intricate patterns through repeated function applications, revealing emergent structures from simple mathematical rules.",
            "reservoir": "Reservoir computing methods generate fractals through dynamic systems, where chaotic attractors form complex and beautiful patterns."
        }
    
    def generate(self) -> List[Dict[str, Any]]:
        """Generate fractal gallery data from method subdirectories."""
        fractals = []
        
        if not self.images_dir.exists():
            print(f"Warning: {self.images_dir} does not exist")
            return fractals
        
        # Get all method directories
        method_dirs = [d for d in self.images_dir.iterdir() 
                      if d.is_dir() and not d.name.startswith('.')]
        
        method_counts = {}
        
        for method_dir in sorted(method_dirs):
            method_name = method_dir.name
            
            # Get all image files in this method directory
            image_files = sorted([
                f for f in method_dir.iterdir() 
                if f.suffix.lower() in ['.png', '.jpg', '.jpeg', '.gif']
                and not f.name.startswith('.')
            ])
            
            method_counts[method_name] = len(image_files)
            
            # Add each fractal with method metadata
            for i, image_file in enumerate(image_files):
                relative_path = f"images/{method_name}/{image_file.name}"
                
                fractals.append({
                    "method": method_name,
                    "index": i,
                    "src": relative_path
                })
        
        # Print summary
        print(f"  Methods found:")
        for method, count in method_counts.items():
            print(f"    - {method}: {count} images")
        
        return fractals


class PhotographyGalleryGenerator(GalleryDataGenerator):
    """Generate data for photography gallery organized by location."""
    
    def __init__(self, base_dir: str = "photography"):
        super().__init__(base_dir)
        self.images_dir = self.base_dir / "images"
    
    def generate(self) -> List[Dict[str, Any]]:
        """
        Generate photography gallery data from existing JSON.
        
        This method reads the existing gallery-data.json and can be extended
        to automatically discover new images in location subdirectories.
        """
        existing_file = self.base_dir / "gallery-data.json"
        
        if existing_file.exists():
            print(f"  Reading existing data from {existing_file}")
            with open(existing_file, 'r') as f:
                photos = json.load(f)
            
            # Count by location
            locations = {}
            for photo in photos:
                loc = photo.get('location', 'Unknown')
                locations[loc] = locations.get(loc, 0) + 1
            
            print(f"  Locations found:")
            for location, count in sorted(locations.items()):
                print(f"    - {location}: {count} photos")
            
            return photos
        
        # If no existing file, scan directories
        print(f"  No existing data, scanning {self.images_dir}")
        photos = []
        
        if not self.images_dir.exists():
            print(f"Warning: {self.images_dir} does not exist")
            return photos
        
        # Get all location directories
        location_dirs = [d for d in self.images_dir.iterdir() 
                        if d.is_dir() and not d.name.startswith('.')]
        
        for location_dir in sorted(location_dirs):
            location_name = location_dir.name.replace('_', ' ').title()
            
            # Get all image files
            image_files = sorted([
                f for f in location_dir.iterdir() 
                if f.suffix.lower() in ['.png', '.jpg', '.jpeg', '.gif']
                and not f.name.startswith('.')
            ])
            
            for image_file in image_files:
                relative_path = f"images/{location_dir.name}/{image_file.name}"
                
                photos.append({
                    "src": relative_path,
                    "location": location_name,
                    "caption": "",  # To be filled manually
                    "date": ""      # To be filled manually
                })
        
        return photos


def main():
    parser = argparse.ArgumentParser(
        description='Generate gallery data JSON files',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument(
        '--gallery',
        choices=['fractal', 'photography'],
        help='Which gallery to generate data for'
    )
    parser.add_argument(
        '--all',
        action='store_true',
        help='Generate data for all galleries'
    )
    
    args = parser.parse_args()
    
    if not args.gallery and not args.all:
        parser.print_help()
        return
    
    print("Gallery Data Generator")
    print("=" * 50)
    
    generators = []
    
    if args.all or args.gallery == 'fractal':
        generators.append(('Fractal Gallery', FractalGalleryGenerator(), 'gallery-data.json'))
    
    if args.all or args.gallery == 'photography':
        generators.append(('Photography Gallery', PhotographyGalleryGenerator(), 'gallery-data.json'))
    
    for name, generator, output_file in generators:
        print(f"\n{name}")
        print("-" * 50)
        try:
            generator.save(output_file)
        except Exception as e:
            print(f"✗ Error generating {name}: {e}")
    
    print("\n" + "=" * 50)
    print("Done!")


if __name__ == "__main__":
    main()
